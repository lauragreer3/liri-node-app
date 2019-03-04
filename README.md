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