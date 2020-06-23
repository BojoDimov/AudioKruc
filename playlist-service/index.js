import express from 'express';
import cors from 'cors';
import config from '../config.js';
import Ws from 'ws';
import Url from 'url';
import Fs from 'fs';
import Path from 'path'
import { PlaylistPlayer } from './playlist-player.js';

const __dirname = Path.resolve();
const playlistRoot = 'playlists';

const playlists = Fs.readdirSync(Path.join(__dirname, playlistRoot))
  .map((playlist, index) => {
    return {
      id: index + 1,
      name: playlist,
      songs: Fs.readdirSync(Path.join(__dirname, playlistRoot, playlist))
        .map((song, index) => {
          return {
            id: index + 1,
            name: song.replace(".mp3", ""),
            path: Path.join(__dirname, playlistRoot, playlist, song)
          }
        })
    };
  });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/playlists/:id', (req, res, next) => {
  let playlist = playlists.find(e => e.id == parseInt(req.params.id));
  return res.json(playlist);
});

app.get('/playlists', (req, res, next) => {
  return res.json(playlists);
});

const server = app.listen(
  config["playlists-service"].port,
  () => console.log(`[playlists-service]: listening at http://localhost:${config["playlists-service"].port}`)
);

const webSocketServer = new Ws.Server({
  server: server,
});

webSocketServer.on("listening", _ => console.log(`[ws]: Server listening`));

webSocketServer.on('connection', (socket, request) => {
  const id = getPlaylistId(request.url);
  console.log(`[ws]: Client connected. PlaylistId: ${id}`);

  const playlist = playlists.find(e => e.id == id);
  if (playlist != null) {
    const player = new PlaylistPlayer(socket, playlist);
    player.play(3);
  }
});

function getPlaylistId(url) {
  return parseInt(Url.parse(url).pathname.trim().replace("/", ""));
}
