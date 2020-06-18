import WebSocket from 'ws';
import Url from 'url';
import config from '../config.js';
import SongStream from './song-stream.js';

const server = new WebSocket.Server({
  port: config["streaming-service"].port
});

const songUrl = 'https://www.youtube.com/watch?v=FK91w16eJ48';

const options = {
  format: 'audiovideo',
  quality: 'highestaudio'
}

server.on("listening", _ => console.log(`[ws]: Server listening`));

server.on("connection", (socket, request) => {
  const pathname = Url.parse(request.url).pathname;
  console.log(`[ws]: Client connected. ${pathname}`);

  socket.on('message', message => {
    message = JSON.parse(message);
    if (message.type === 'song-play') {
      console.log(`[ws]: Received 'song-play' packet`);
      new SongStream(message.data, (event, data) => {
        if (event === 'song-info')
          socket.send(JSON.stringify(data));
        else if (event === 'song-data') {
          console.log(`[stream]: Sending segment`);
          socket.send(data);
        }
      });
    }
  });
});