let io = require('socket.io')(12909);
const ytdl = require('ytdl-core');

let songs = [];

io.on('connection', (socket) => {
  console.log('Successfully connected to localhost:12909');
  socket.on('requestSong', data => downloadSong(socket, data));
});

function downloadSong(socket, songRequestData) {
  let song = songs.find(song => song.key == songRequestData.key);
  if (song) {
    console.log('resolved without downloading');
    socket.emit('receiveSongChunk:' + songRequestData.key, song.buffer);
    return;
  }

  let stream = ytdl(songRequestData.key, { filter: "audioonly" });
  let bufferList = [];

  // stream.on('progress', (chunkSize, downloaded, totalSize) => {
  //   console.log("Downloaded: ", downloaded);
  //   console.log("Total size: ", totalSize);
  // });

  stream.on('data', buffer => bufferList.push(buffer));

  stream.on('finish', () => {
    console.log('finished downloading');
    let buffer = Buffer.concat(bufferList);
    songs.push({ key: songRequestData.key, buffer: buffer });
    socket.emit('receiveSongChunk:' + songRequestData.key, buffer);
  });
}
