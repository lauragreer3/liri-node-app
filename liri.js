require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const fs = require('fs');
const moment = require('moment');
const axios = require('axios');
var base_omdb_url = "http://www.omdbapi.com/?apikey=" + keys.omdb + "&";


var liri_app = {
    command: "",
    liri_arg: "",
    script_name: "",
    myself: this,
    log_file: "log.txt",
    command_file: "random.txt",
    command_timestamp: "",
    write_to_logfile: false,
    init: function () {
        //log the comman to the text file
        //use moment to get the timestamp
        this.command_timestamp = moment().format('L');
        this.logstream = fs.createWriteStream(this.log_file, {flags: 'a'}); 
        this.script_name = process.argv[1];
        this.command = process.argv[2];
        this.liri_arg = process.argv[3];
        this.process_command(this.command, this.liri_arg);  
    },
    display_help: function () {
        this.log_command("LIRIBOT HELP");
        this.log_command("____________");
        this.log_command("Commands: ");
        this.log_command("concert-this <artist/band>");
        this.log_command("spotify-this-song <song-name>");
        this.log_command("movie-this- <movie-name>");
        this.log_command("do-what-it-says");
    },

    process_command: function (command, arg) {

        switch (command) {
            case "concert-this":
                //look up concert info
                if (arg == "" || arg == undefined) {
                    this.log_command("Error: please enter an artist");
                }
                else {
                    this.lookup_concert_by_artist(arg);
                }

                break;
            case "spotify-this-song":
                //call spotify api
                this.song_name = "I saw the sign";
                if (arg !="" && this.liri_arg != undefined) {
                    this.song_name = arg;
                }
                this.log_command("Searching Spotify...");
                spotify.search({ type: 'track', query: this.song_name }, function(err, data) {
                    if (err) {
                        liri_app.log_command('Error occurred: ' + err);
                    }
                    else
                    {
                        liri_app.display_spotify_song_info(data);
                    }                   
                });
                break;
            case "movie-this":
                //handle request to omdb
                var movie_title = "Mr. Nobody"; //default
                if (arg != "" && this.liri_arg != undefined) {
                    movie_title = this.liri_arg;
                }
                this.request_movie_info(movie_title);
                break;
            case "do-what-it-says":
                //open random.txt and parse the command
                this.run_file_command(this.command_file);
                break;
            default:
                if(command == "" || command == undefined) {
                    this.log_command('Error: no command entered.');
                }
                else
                {
                    this.log_command('Error: Command not recognized');
                }                   
                this.display_help();
                break; 
        }
    },
    log_command: function (log_message) {
        console.log(log_message);
        //append the message to the logfile
        //via https://stackoverflow.com/question/3459476/how-to-append-to-a-file-in-node/43370201#43370201 concerning appending vs opening a write stream. ie never use append node as it creates a new file handle and will eventually get an EMFILE console.error();

    },
    lookup_concert_by_artist: function(artist_name) {
        //lookup information on
        var bandsintown_endpoint = "https://rest.bandsintown.com/artists/" + artist_name + "/events?app_id=codingbootcamp";
        axios.get(bandsintown_endpoint)
            .then(function(response) {
                if(response.data.length != 0) {
                   
                    var formatted_date = moment(response.data[0].datetime).format("L")
                    liri_app.log_command('Bands In Town Information: \n');
                    liri_app.log_command('Name of Venue: ' + response.data[0].venue.name);
                    liri_app.log_command('Date of Event: ' + formatted_date);
                    liri_app.log_command('City: ' + response.data[0].venue.city);
            }
            else
            {
                liri_app.log_command('No data found for search term ' + artist_name);
            }    
            })
            .catch(function(err) {
                liri_app.log_command('Error retrieving bandsintown api information: ');
                liri_app.log_command(err);
            })
    },
    display_spotify_song_info: function (song_data) {

        var artists = "";
        song_data.tracks.items[0].artists.forEach(function(element) {
            artists += element.name + " ";
        });
        this.log_command('Artist: ' + artists+ '\n');
        this.log_command('Song Name: ' + song_data.tracks.items[0].name + '\n');
        this.log_command('Preview URL: ' + song_data.tracks.items[0].preview_url + '\n');
        this.log_command('Album: ' + song_data.tracks.items[0].album.name + '\n');
       
    },
    request_movie_info: function (movie_name) {
        var omdb_request_url = omdb_request_url + "t=" + endcodeURI(movie_name) + "&type=movie&plot=short";
        axios.get(omdb_request_url)
            .then(function (response) {
                var rotten_tomatoes_score = "";
                if (response.data.Ratings != undefined) {
                    response.Ratings.forEach(function(element) {
                        if(element.source == "Rotten Tomatoes") {
                            rotten_tomatoes_score = element.Value;
                        }
                    });
                }    

                if(rotten_tomatoes_score == "")
                    rotten_tomatoes_score = "N/A";
                liri_app.log_command('OMDB Request Successful');
                liri_app.log_command('Movie title: ' + response.data.Title);
                liri_app.log_command('Year of Release: ' + response.data.Year);
                liri_app.log_command('IMDB Rating: ' + response.data.imdbRating);
                liri_app.log_command('Rotten Tomatoes: ' + rotten_tomatoes_score);
                liri_app.log_command('Country: ' + response.data.Country);
                liri_app.log_command('Plot: ' + response.data.Plot);
                liri_app.log_command('Actors: ' + response.data.Actors);
          })
          .catch(function(err) {
            this.log_command(err);
          });   
    },
    run_file_command: function (filename) {
        fs.readFile(filename, (err,data) => {
            if(err) {
                this.log_command('Error opening ' + filename);
            }
            else
            {
                var commands = data.split( ',');
                this.process_command(commands[0], commands[1]);
            }
        });
    }
};
liri_app.init();
