require("dotenv").config();
let SpotifyWebApi = require("spotify-web-api-node");
let fs = require("fs");
const path = require("path");

let credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_AUTHZ_REDIRECT_URI,
};

let spotifyApi = new SpotifyWebApi(credentials);

/**
 * This access token is generated using get_access_token.js, copy-paste here
 */
let accessToken = "";
spotifyApi.setAccessToken(accessToken);

async function* fetchSavedTracks() {
  let currentPageItems = Infinity;
  let limit = 50;
  let offset = 0;

  while (currentPageItems > 0) {
    const data = await spotifyApi.getMySavedTracks({
      limit: limit,
      offset: offset * limit,
    });
    currentPageItems = data.body.items.length;
    offset++;
    yield data.body.items;
  }
}

async function* getUserPlaylists() {
  let currentPageItems = Infinity;
  let limit = 50;
  let offset = 0;

  while (currentPageItems > 0) {
    const data = await spotifyApi.getUserPlaylists({
      limit: limit,
      offset: offset * limit,
    });
    currentPageItems = data.body.items.length;
    offset++;
    yield data.body.items;
  }
}

async function* getPlaylistTracks(playlistId) {
  let currentPageItems = Infinity;
  let limit = 50;
  let offset = 0;

  while (currentPageItems > 0) {
    const data = await spotifyApi.getPlaylistTracks(playlistId, {
      limit: limit,
      offset: offset * limit,
    });
    currentPageItems = data.body.items.length;
    offset++;
    yield data.body.items;
  }
}

async function downloadSongs() {
  let playlistIds = [];
  for await (let playlists of getUserPlaylists()) {
    playlistIds.push(...playlists.map((playlist) => playlist.id));
  }

  let allSongs = [];
  for (let playlistId of playlistIds) {
    for await (let tracks of getPlaylistTracks(playlistId)) {
      allSongs.push(
        ...tracks
          .filter((t) => t.track)
          // TODO: I want to have songs without images, it is importanter to see them
          .filter((t) => t.track.album.images.length > 0)
          .map((song) => ({
            spotifyId: song.track.id,
            name: song.track.artists[0].name + " - " + song.track.name,
            spotifyThumbnail: song.track.album.images[0].url,
          }))
      );
    }
  }

  for await (let tracks of fetchSavedTracks()) {
    tracks.forEach(function (song, index) {
      let item = {
        spotifyId: song.track.id,
        name: song.track.artists[0].name + " - " + song.track.name,
        spotifyThumbnail: song.track.album.images[0].url,
      };
      allSongs.push(item);
    });
  }

  fs.writeFileSync(
    path.join(__dirname, "../../Data", "playlists_spotify.json"),
    JSON.stringify(allSongs, null, 2),
    function (err) {
      if (err) {
        console.log("Something went wrong!", err);
      }
    }
  );
  console.log("Total songs:", allSongs.length);
}

downloadSongs();
