require('dotenv').config();
const https = require('https');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const YOUTUBE_BASE_API = 'https://youtube.googleapis.com/youtube';
const YT_PLAYLISTS_V3 = YOUTUBE_BASE_API + '/v3/playlists';
const YT_PLAYLIST_ITEMS_V3 = YOUTUBE_BASE_API + '/v3/playlistItems';

getPlaylists();

async function getPlaylists() {
  let playlistsResponse = await httpGet(getPlaylistsUri());
  let playlists = playlistsResponse.items.map(playlist => {
    return {
      id: playlist.id,
      name: playlist.snippet.title,
      description: playlist.snippet.description,
      thumbnails: playlist.snippet.thumbnails
    }
  });

  for (let playlist of playlists) {
    playlist.songs = await getSongs(playlist);
  }

  console.log(playlists);
  fs.writeFileSync(path.join(__dirname, '../', 'Data', 'playlists.json'), JSON.stringify(playlists));
}

function getSongs(playlist) {
  return httpGet(getPlaylistSongsUri(playlist))
    .then(data => {
      return data.items.map(song => {
        return {
          id: song.id,
          name: song.snippet.title,
          description: song.snippet.description,
          thumbnails: song.snippet.thumbnails
        }
      });
    });
}

function getPlaylistsUri() {
  return YT_PLAYLISTS_V3 + '?' + [
    'maxResults=1000',
    'part=snippet',
    `channelId=${process.env.YT_CHANNEL_ID}`,
    `key=${process.env.YT_API_KEY}`
  ].join('&');
}

function getPlaylistSongsUri(playlist) {
  return YT_PLAYLIST_ITEMS_V3 + '?' + [
    'maxResults=1000',
    'part=snippet',
    `playlistId=${playlist.id}`,
    `key=${process.env.YT_API_KEY}`
  ].join('&');
}

function httpGet(uri) {
  return new Promise((resolve, reject) => {
    https.get(uri, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        resolve(JSON.parse(raw));
      });
      res.on('error', err => reject(err));
    });
  });
}
