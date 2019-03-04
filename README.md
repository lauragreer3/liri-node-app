# liri-node-app

liri-bot
Overview:
Liri-bot is a command line interface (CLI) app created in Node.js that takes in user input (performers, songs, and movie titles) as parameters and returns information about each of those inputs.

How to Install:
Open terminal or git bash and clone the repository to the directory of your choice. Enter npm install or npm i to install the node packages needed to run the app (axios, dotenv, moment, node-spotify-api). Note: A local .env file containing the Spotify API ID and secret will be needed. A Spotify ID and secret can be obtained here.

Specifications:
liri-bot takes in the following commands:
concert-this
spotify-this-song
movie-this
do-what-it-says
What Each Command Does:
concert-this:
Type node liri.js concert-this <artist/band name> into the command line.

<!-- <a target="_blank" rel="noopener noreferrer" href="#"></a>
<img src="concert-this-command.PNG">"concert-this</img> -->

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

Venue location
Name of the venue
Date of the Event (use moment to format this as "MM/DD/YYYY")

<!-- insert image here -->

spotify-this-song:
Type node liri.js spotify-this-song <song name> into the command line.

<!-- insert image file here -->

This will show the following information about the song in your terminal/bash window:

The song's title
Artist(s)
A preview link of the song from Spotify
The album that the song is from

<!-- insert image file here -->

If no song name is provided then the program will default to "The Sign."

movie-this:
Type node liri.js movie-this <movie name> into the command line.

<!-- command line image -->

This will output the following information to your terminal/bash window:

Title of the movie
Rating of the movie
Year the movie came out
IMDB Rating of the movie
Rotten Tomatoes Rating of the movie
Country where the movie was produced
Language of the movie
Plot of the movie
Actors in the movie

<!-- movie command info image here -->

If the user doesn't type a movie name in, the program will output data for the movie 'Mr. Nobody.'

do-what-it-says:
Type node liri.js do-what-it-says into the command line

<!-- insert command line image -->

Using the fs Node package, liri-bot will take the text inside of the text file named random.txt and then use it to call one of liri-bot's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

<!-- insert spotify command image -->

Users can edit the text in random.txt to test out the feature for concert-this and movie-this.