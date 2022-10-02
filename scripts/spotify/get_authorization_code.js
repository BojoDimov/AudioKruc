require("dotenv").config();
let SpotifyWebApi = require("spotify-web-api-node");

let scopes = [
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
  ],
  redirectUri = process.env.SPOTIFY_AUTHZ_REDIRECT_URI,
  clientId = process.env.SPOTIFY_CLIENT_ID,
  state = "some-state-of-my-choice";

let spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
});

let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

console.log(authorizeURL);
