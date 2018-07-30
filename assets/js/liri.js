require("dotenv").config();
var request = require('request');

var axios = require('axios');

var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var inp = process.argv[2];

if (inp === "my-news") {

    newsApp();

}

else if (inp === "spotify") {

    spotifyThis();
}

else if (inp === "omdb") {

    omdb();

}

else if (inp === "do") {
    console.log("do");
    fs.readFile('../random.txt', 'utf8', function(error,data) {
        if(error) {
            console.log(error);
        }
        console.log(data);
    });
}

else {
    console.log("command not supported");
}

function newsApp() {

    var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=0f2e2a11911b4c83ac6fa6d499b5e75f';
    axios.get(url).then(function (response) {
        // console.log(response.data.articles[0].title);
        for (var i = 0; i < response.data.articles.length; i++) {
            console.log("-------------------");
            console.log(response.data.articles[i]); }
            console.log("-------------------");
    }).catch(function (error) {
        console.log(error);
    });
    }


function omdb() {

    console.log("omdb");

    var movie = process.argv[2];
    
    var query = 'http://www.omdbapi.com/?apikey=d8a8e297&t=movie';
    
    axios.get(query).then(function (movies) {
        console.log(' - - - - - - - - -  - - - - - - - -  - - - - -');
        console.log(movies.data);
        console.log(' - - - - - - - - -  - - - - - - - -  - - - - -');

    }).catch(function (error) {
        console.log(error);
    })

}


function spotifyThis() {

    console.log(process.env.SPOTIFY_SECRET, process.env.SPOTIFY_ID)
    var spotify = new Spotify({
        id: '8b60044d6a6a474eb00c29649f5b6740',
        secret: 'b40a959f647843a988e9ddcd0c4e449f'
    });
    var song = process.argv[3];
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
    });
}
