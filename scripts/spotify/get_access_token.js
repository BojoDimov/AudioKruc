require("dotenv").config();
let SpotifyWebApi = require("spotify-web-api-node");

let credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_AUTHZ_REDIRECT_URI,
};

let spotifyApi = new SpotifyWebApi(credentials);

/**
 * Populate this by:
 * 1. Run get_authorization_code
 * 2. Copy the generated url and navigate in browser
 * 3. Copy the authorization code form the browser uri after the redirect
 */
let code = "";

spotifyApi.authorizationCodeGrant(code).then(
  function (data) {
    console.log(data.body["access_token"]);
  },
  function (err) {
    console.log("Something went wrong!", err);
  }
);
