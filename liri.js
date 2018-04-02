require("dotenv").config();

var keys = require("./keys.js");
console.log(keys.twitter);
console.log(process.env.TWITTER_CONSUMER_KEY);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
