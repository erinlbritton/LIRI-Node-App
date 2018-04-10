// Include the required packages
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var figlet = require('figlet');
var moment = require('moment');
var fs = require("fs");

// Use keys from .env file in constructors to keep them private
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

// Initialize global variables
var spotifyResults = [];
var command = process.argv[2];
var criteria = "";
if (process.argv.length > 3) {
    for (var i = 3; i < process.argv.length-1; i++) {
        criteria += `${process.argv[i]} `;
    } 
    criteria += process.argv.pop(); 
}
var nodeEntry = `${command} ${criteria}`;
var nodeTime = moment().format("ddd, MMM D, YYYY");
    nodeTime += " at ";
    nodeTime += moment().format("hh:mm:ss a");
var textFile = "log.txt";

// Function to search Spotify for a song, format results, and log output
function spotifySearch(song) {
    spotify.search({ type: 'track', query: song, limit: 5 }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }

    var spotifyResult = data.tracks.items[0]; 

        figlet(spotifyResult.artists[0].name, {font: 'standard'}, function(err, data) {
            if (err) {
                console.log(`• Artist:          ${spotifyResult.artists[0].name}`);
                console.dir(err);
                return;
            }
            var output = 
`Command "${nodeEntry}" executed at ${nodeTime}
${data}

• Song:            ${spotifyResult.name}
• Album:           ${spotifyResult.album.name}
• Preview URL:     ${spotifyResult.preview_url}

`;
            console.log(output);
            logOutput(output);
        });    
        
    });
};

// Function to search Twitter for my top 20 tweets, format output, and log results
function twitterSearch() {
    
    twitter.get('statuses/user_timeline', {screen_name: '@erinHCPR', count: 20}, function(error, tweets, response) {
        if (!error) {
            var name = `@${tweets[0].user.screen_name}`;
            figlet(name, {font: 'standard'}, function(err, data) {
                if (err) {
                    console.log(name);
                    console.dir(err);
                    return;
                }
                var output =
`Command "${nodeEntry}" executed at ${nodeTime}
${data}

`;
                for (var i = 0; i < tweets.length; i++) {
                output +=
`• Tweet #${i+1}
${tweets[i].text}
`;
                    var RT_at = tweets[i].created_at.split(" ");
                    var RT = `${RT_at[0]}, ${RT_at[1]} ${RT_at[2]}, ${RT_at[5]} at ${moment(RT_at[3], 'hh:mm:ss').format('h:mm:ss a')}`;
                    var created_at = tweets[i].retweeted_status.created_at.split(" ");
                    var created = `${created_at[0]}, ${created_at[1]} ${created_at[2]}, ${created_at[5]} at ${moment(created_at[3], 'hh:mm:ss').format('h:mm:ss a')}`;
                output +=    
`RT: ${RT} | Originally Posted: ${created}

`; 
                }   
                console.log(output);
                logOutput(output);
            });     
        } else {
            console.log(error);
        }
    });
};

// Function to search OMDB for movie title, format response, and log results
function OMDBSearch(movie) {
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {
        var body = JSON.parse(body);
        figlet(`${body.Title}`, {font: 'standard'}, function(err, data) {
            if (err) {
                console.log(err);
                return;
            }
            var output =
`Command "${nodeEntry}" executed at ${nodeTime}
${data}

• Year:            ${body.Year}
• IMDB:            ${body.Ratings[0].Value}
• Rotten Tomatoes: ${body.Ratings[1].Value}
• Country:         ${body.Country}
• Language(s):     ${body.Language}
• Plot:            ${body.Plot}
• Actors:          ${body.Actors}

`;
            console.log(output);
            logOutput(output);
        });
    });
};

// Function to read command from random.txt and execute the corresponding function as described above
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
        return console.log(error);
        }
    
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        var command = dataArr[0];
        var criteria = dataArr[1].split("\"").join("");
    
        // We will then re-display the content as an array for later use.
        if (command === "spotify-this-song") {
            if (criteria.length === 0) {
                spotifySearch("The Sign Ace of Base");
            } else {
                spotifySearch(criteria);
            }
        } else if (command === "my-tweets") {
            twitterSearch();
        } else if (command === "movie-this") {
            if (criteria.length === 0) {
                OMDBSearch("Mr. Nobody");
            } else {
                OMDBSearch(criteria);
            }
        }
    });
};

// Function to log output in log.txt
function logOutput(output) {
    fs.appendFile(textFile, output, function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
      
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          console.log(`Output saved to ${textFile}`);
        }
      
      });
};

// If-else handles user input to run the correct function
if (command === "spotify-this-song") {
    if (criteria.length === 0) {
        spotifySearch("The Sign Ace of Base");
    } else {
        spotifySearch(criteria);
    }
} else if (command === "my-tweets") {
    twitterSearch();
} else if (command === "movie-this") {
    if (criteria.length === 0) {
        OMDBSearch("Mr. Nobody");
    } else {
        OMDBSearch(criteria);
    }
} else if (command === "do-what-it-says") {
    doWhatItSays();
};
