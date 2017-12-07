let io = require('socket.io')(12909);
const ytdl = require('ytdl-core');

io.on('connection', (socket) => {
  console.log('Successfully connected to localhost:12909');
  socket.on('requestSong', data => downloadSong(socket, data));
});

function downloadSong(socket, songRequestData) {
  let stream = ytdl(songRequestData.key, { filter: "audioonly" });
  let bufferList = [];

  // stream.on('progress', (chunkSize, downloaded, totalSize) => {
  //   console.log("Downloaded: ", downloaded);
  //   console.log("Total size: ", totalSize);
  // });

  stream.on('data', buffer => bufferList.push(buffer));

  stream.on('finish', () => {
    socket.emit('receiveSongChunk:' + songRequestData.key, Buffer.concat(bufferList));
  });
}
