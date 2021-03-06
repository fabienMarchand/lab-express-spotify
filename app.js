require("dotenv").config();

const express = require("express");
const hbs = require("hbs");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// Our routes go here:
app.get("/", function (req, res, next) {
  res.render("index");
});

app.get("/artist-search", function(req, res){
  spotifyApi
  .searchArtists(req.query.artistSearch)
  .then(data => {
    console.log('The received data from the API: ', data.body);
    console.log("=================================================================");
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    const searchArtist = data.body.artists;
    console.log("searchArtist",searchArtist);
    console.log("=================================================================");
     res.render("artist-search-results", { searchArtist });
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));

});



app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
