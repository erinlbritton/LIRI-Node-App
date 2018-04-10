# LIRI-Node-App
This exercise required the use of node to create LIRI.js, which stands for "language interpretation and recognition interface." LIRI is a command line node app that takes in parameters, logs the data to your terminal/bash window, and outputs the data to a .txt file called "log.txt".

# Requirements
LIRI accepts four commands:

## `my-tweets`
```
node liri.js my-tweets
```
This will show my last 20 tweets and when they were created in your terminal/bash window.

## `spotify-this-song`
```
node liri.js spotify-this-song <song name>
```
This will show the following information about the song in your terminal/bash window:

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

If no song is provided then your output will default to "The Sign" by Ace of Base.

## `movie-this`
```
node liri.js movie-this <movie name>
```
This will output the following information to your terminal/bash window:

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

## `do-what-it-says`
```
node liri.js do-what-it-says
```
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

# Packages Used
* [dotenv] : Loads environment variables from .env file
* [figlet] : Creates ASCII Art from text. A full implementation of the FIGfont spec.
* [fs] : The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.
* [moment] : Parse, validate, manipulate, and display dates
* [node-spotify-api] : A simple wrapper for the spotify api
* [request] : Simplified HTTP request client.
* [twitter] : Twitter API client library for node.js

[dotenv]: https://www.npmjs.com/package/dotenv
[figlet]: https://www.npmjs.com/package/figlet
[fs]: https://nodejs.org/api/fs.html
[moment]: https://www.npmjs.com/package/moment
[node-spotify-api]: https://www.npmjs.com/package/node-spotify-api
[request]: https://www.npmjs.com/package/request
[twitter]: https://www.npmjs.com/package/twitter

# .env and .gitignore
* The user will need API keys for Spotify and Twitter API. Create a file named <b>.env</b> and add the following to it, replacing the values with your API keys (no quotes) once you have them:
```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```

* Make a <b>.gitignore</b> file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.
```
node_modules
.DS_Store
.env
```