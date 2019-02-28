/*
//liri supported commands: 

concert-this <artist/band-name>
    serach bands in a town for an artist and render
        name of venue,
        venue location, 
        date of event formatted mm/dd/yyyy
        
spotify-this-song <song-name>
    returns from spotify api
        artist
        song name
        preview link of song is from spotify
        album that the song is from
        default value = the sign by ace of base
movie-this <movie-name>
    grab from omdb:
        title of movie
        year of release
        imdb rating 
        rotten tomatoes rating
        country where produced
        plot
        actors in the movie
        defaults to "mr mobody"

do-what-it-says

const var bandsintown_endpoint = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
*/
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var moment = require('moment');

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
        this.command_timestamp = moment().format('mm/dd/yy');
        this.logstream = fs.createWriteStream(this.log_file, {
            flags: 'a'
        });
    },
    display_help: function () {
        this.log_command("LIRIBOT HELP");
        this.log_command("____________\n");
        this.log_command("Commands: \n");
        this.log_command("concert-this <artist/band\n");
        this.log_command("spotify-this-song <song-name>");
        this.log_command("movie-this- <movie-name>");
        this.log_command("do-what-it-says");
    },

    process_command: function () {

        this.script_name = process.argv[1];
        this.command = process.argv[2];
        this.liri_arg = process.argv[3];

        switch (this.command) {
            case "concert-this":
                //look up concert info
                if (this.liri_arg != "" && this.liri_arg != undefined) {
                    this.log_command("Error: please enter an artist");
                }
                this.lookup_concert_by_artist(this.liri_arg);
                break;
            case "spotify-this-song":
                //call spotify api
                this.song_name = "I saw the sign";
                if (this.liri_arg != "" && this.liri_arg != undefined) {
                    this.song_name = this.liri_arg;
                }
                this.log_command("Searching Spotify...");
                spotify.search({ type: 'track', query: this.song_name }, function(err, data) {
                    if (err) {
                        this.log_command('Error occurred: ' + err);
                    }
                    else
                    {
                        this.display_spotify_song_info(data);
                    }                   
                });
                break;
            case "movie-this":
                //handle request to omdb
                var movie_title = "Mr. Nobdy"; //default
                if (this.liri_arg != "" && this.liri_arg != undefined) {
                    movie_title = this.liri_arg;
                }
                var base_omdb_url = omdb_request_url + "s=" + movie_title;
                break;
            case "do-what-it-says":
                //open random.txt and parse the command

                break;
        }
    },
    log_command: function (log_message) {
        console.log(log_message);
        //append the message to the loggile
        //via https://stackoverflow.com/question/3459476/how-to-append-to-a-file-in-node/43370201#43370201 concerning appending vs opening a write stream. ie never use append node as it creates a new file handle and will eventually get an EMFILE console.error();

    },
    display_spotify_song_info: function (song_data) {
        this.log_command('Spotify Song Information:\n');
        // this.log_command('Artist: ' + song_data.artist + '\n');
        // this.log_command('Song Name: ' + song_data.song_title + '\n');
        // this.log_command('Preview URL: ' + song_data.preview_url + '\n');
        // this.log_command('Album: ' + song_data.album + '\n');
        console.log('spotify data:');
        console.log(song_data);
    },
    request_movie_info: function (movie_name) {

    },
    run_file_command: function () {

    }
},