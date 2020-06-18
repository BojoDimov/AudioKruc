import express from 'express';
import cors from 'cors';
import config from '../config.js';
import RoomsRepository from './api/rooms-repository.js';
import Ws from 'ws';
import Url from 'url';

const roomsRepo = new RoomsRepository();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/rooms/:id/songs', async (req, res, next) => {
  await roomsRepo.addSong(req.params.id, req.body);
  return res.json({});
});

app.put('/room/:id/songs', (req, res, next) => {
  return res.json(roomsRepo.updateSongs(req.params.id, req.body));
});

app.put('/room/:id/join', (req, res, next) => {
  // should establish the connection over the ws protocol
  // should save the socket to users array for streaming
  // should emit current song metadata
});

app.get('/rooms/:id', (req, res, next) => {
  return res.json(roomsRepo.get(req.params.id));
});

app.get('/rooms', (req, res, next) => {
  return res.json(roomsRepo.getAll(req.query));
});

app.patch('/rooms/:id', (req, res, next) => {
  return res.json(roomsRepo.update(req.params.id, req.body));
});

app.post('/rooms', (req, res, next) => {
  return res.json(roomsRepo.create(req.body));
});

const server = app.listen(
  config["rooms-service"].port,
  () => console.log(`[rooms-service]: listening at http://localhost:${config["rooms-service"].port}`)
);

const webSocketServer = new Ws.Server({
  server: server,
});

webSocketServer.on("listening", _ => console.log(`[ws]: Server listening`));

webSocketServer.on('connection', (socket, request) => {
  const roomId = getRoomId(request.url);
  console.log(`[ws]: Client connected. RoomId: ${roomId}`);
  roomsRepo.join(roomId, socket);
});

function getRoomId(url) {
  return parseInt(Url.parse(url).pathname.trim().replace("/", ""));
}
