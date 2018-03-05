const EventEmitter = require('events');
class QueueEvents extends EventEmitter { }
const download = require('./audio-stream').download;

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

let options = {
  quality: 'lowest',
  filter: 'audioonly'
};

io.on('connection', (socket) => {
  let session = ++sessionId;
  socket.emit('session', { sessionId: session });
  socket.on('requestSong', data => downloadSong(session, socket, data));
  queue.on('add', song => {
    if (song.requestedFrom != session)
      socket.emit('queue-add:' + session, song);
  });
});

function downloadSong(session, socket, songRequestData) {
  console.log('Requested song:', songRequestData);
  let song = songs.find(song => song.key == songRequestData.key);
  if (song) {
    console.log('resolved without downloading');
    song.requestedFrom = session;
    socket.emit('receiveSongChunk:' + song.key, song.buffer);
    if (songRequestData.isInQueue)
      queue.emit('add', song);
    return;
  }

  download('http://www.youtube.com/watch?v=' + songRequestData.key, options)
    .then(buffer => {
      console.log('finished downloading');
      songRequestData.buffer = buffer;
      songRequestData.requestedFrom = session;
      songs.push(songRequestData);
      socket.emit('receiveSongChunk:' + songRequestData.key, buffer);
      if (songRequestData.isInQueue)
        queue.emit('add', songRequestData);
    });

  // let stream = ytdl('http://www.youtube.com/watch?v=' + songRequestData.key, {
  //   //quality: 'lowest',
  //   quality: 'highestaudio',
  //   filter: 'audioonly'
  // });
  // let bufferList = [];

  // stream.on('data', buffer => bufferList.push(buffer));

  // stream.on('finish', () => {
  //   console.log('finished downloading');
  //   let buffer = Buffer.concat(bufferList);
  //   songRequestData.buffer = buffer;
  //   songRequestData.requestedFrom = session;
  //   songs.push(songRequestData);
  //   socket.emit('receiveSongChunk:' + songRequestData.key, buffer);
  //   if (songRequestData.isInQueue)
  //     queue.emit('add', songRequestData);
  // });
}
