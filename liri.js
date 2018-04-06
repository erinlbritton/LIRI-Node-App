require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var figlet = require('figlet');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var spotifyResults = [];
var command = process.argv[2];
var criteria = "";
if (process.argv.length > 3) {
    for (var i = 3; i < process.argv.length-1; i++) {
        criteria += `${process.argv[i]} `;
    } 
    criteria += process.argv.pop(); 
}

function spotifySearch(song) {
    spotify.search({ type: 'track', query: song, limit: 5 }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }

    var spotifyResult = data.tracks.items[0]; 

        figlet(spotifyResult.artists[0].name, {font: 'standard'}, function(err, data) {
            if (err) {
                console.log(`• Artist:      ${spotifyResult.artists[0].name}`);
                console.dir(err);
                return;
            }
            console.log(data);
            console.log(`• Song:        ${spotifyResult.name}`);
            console.log(`• Album:       ${spotifyResult.album.name}`);
            console.log(`• Preview URL: ${spotifyResult.preview_url}`);
        });    
        
    });
};

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
                console.log(data);
                console.log("     ");
                for (var i = 0; i < tweets.length; i++) {
                    console.log(`${tweets[i].text}`);
                    var RT_at = tweets[i].created_at.split(" ");
                    var RT = `${RT_at[0]}, ${RT_at[1]} ${RT_at[2]}, ${RT_at[5]} at ${moment(RT_at[3], 'hh:mm:ss').format('h:mm:ss a')}`;
                    var created_at = tweets[i].retweeted_status.created_at.split(" ");
                    var created = `${created_at[0]}, ${created_at[1]} ${created_at[2]}, ${created_at[5]} at ${moment(created_at[3], 'hh:mm:ss').format('h:mm:ss a')}`;
                    console.log(`RT: ${RT} | Originally Posted: ${created}`);
                    console.log("     ");
                }
            });     
        } else {
            console.log(error);
        }
    });
};

function OMDBSearch(movie) {
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {
        var body = JSON.parse(body);
        figlet(`${body.Title}`, {font: 'standard'}, function(err, data) {
            if (err) {
                console.log(`Title: ${body.Title}`);
                console.dir(err);
                return;
            }
            console.log(data);
            console.log(`• Year:            ${body.Year}`);
            console.log(`• IMDB:            ${body.Ratings[0].Value}`);
            console.log(`• Rotten Tomatoes: ${body.Ratings[1].Value}`);
            console.log(`• Country:         ${body.Country}`);
            console.log(`• Language(s):     ${body.Language}`);
            console.log(`• Plot:            ${body.Plot}`);
            console.log(`• Actors:          ${body.Actors}`);
        });
    });
};

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