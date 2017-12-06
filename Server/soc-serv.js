let io = require('socket.io')(12909);
const ytdl = require('ytdl-core');

io.on('connection', (socket) => {
  console.log('Successfully connected to localhost:12909');

  socket.on('requestSong', (data, cb) => {
    console.log('ViewKey: ', data.key);
    let stream = ytdl(data.key, { filter: "audioonly" });
    // get data about the stream - on the first return set that data to create buffer whose size is for the whole song
    stream.on('progress', (chunkSize, downloaded, totalSize) => { });

    stream.on('finish', function () {
      console.log("Finsh!");
      socket.emit('responseSong');
    })

    let execCallback = true;
    stream.on('data', buffer => {
      if (execCallback) {
        cb(buffer);
        execCallback = false;
      } else {
        //remove those silly callbacks and proceed to use only the requestSongChunk event
        socket.emit('receiveSongChunk', { key: data.key, buffer: buffer });
      }
    })
  })
});
