let io = require('socket.io')(12909);
const ytdl = require('ytdl-core');

io.on('connection', (socket) => {
  console.log('Successfully connected to localhost:12909');

  socket.on('song', (key, cb) => {
    console.log('ViewKey: ', key);
    let stream = ytdl(key, { filter: "audioonly" });
    stream.on('progress', (chunkSize, downloaded, totalSize) => { });

    stream.on('finish', function () {
      console.log("Finsh!");
      socket.emit('responseSong');
    })

    stream.on('data', buffer => {
      cb(buffer);
    })
  })
});
