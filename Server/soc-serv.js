const EventEmitter = require('events');
class QueueEvents extends EventEmitter { }
const audioStream = require('./audio-stream');

let io = require('socket.io')(12909);
const ytdl = require('ytdl-core');

let songs = [];
let connections = [];
let sessionId = 0;
let queue = new QueueEvents();

let exampleRequestData = {
  key: '',
  buffer: [],
  name: '',
  isInQueue: false
}

io.on('connection', (socket) => {
  let session = ++sessionId;
  socket.emit('session', { sessionId: session });
  socket.on('requestSong', data => audioStream.downloadSong(session, socket, data));
  queue.on('add', song => {
    if (song.requestedFrom != session)
      socket.emit('queue-add:' + session, song);
  });
});
