const EventEmitter = require('events');
class QueueEvents extends EventEmitter { }

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

  let stream = ytdl('http://www.youtube.com/watch?v=' + songRequestData.key, {
    quality: 'lowest',
    filter: 'audioonly'
  });
  let bufferList = [];

  stream.on('data', buffer => bufferList.push(buffer));

  stream.on('finish', () => {
    console.log('finished downloading');
    let buffer = Buffer.concat(bufferList);
    songRequestData.buffer = buffer;
    songRequestData.requestedFrom = session;
    songs.push(songRequestData);
    socket.emit('receiveSongChunk:' + songRequestData.key, buffer);
    if (songRequestData.isInQueue)
      queue.emit('add', songRequestData);
  });
}

// function notifyConnections(connections, songRequestData) {
//   connections.forEach(conn => {
//     console.log('Emmiting event', 'queue-add:' + conn.sessionId);
//     conn.emit('queue-add:' + conn.sessionId, songRequestData)
//   });
// }

// stream.on('progress', (chunkSize, downloaded, totalSize) => {
//   console.log("Downloaded: ", downloaded);
//   console.log("Total size: ", totalSize);
// });

// ytdl.getInfo('http://www.youtube.com/watch?v=' + songRequestData.key)
//   .then(info => console.log(info.formats
//     .filter(e => e.audioEncoding == "mp3")
//     .map(f => {
//       return {
//         type: f.type,
//         container: f.container,
//         audioEncoding: f.audioEncoding,
//         audioBitrate: f.audioBitrate,
//         itag: f.itag
//       };
//     })));
