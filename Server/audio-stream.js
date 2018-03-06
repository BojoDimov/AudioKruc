let ytdl = require('ytdl-core');
let fs = require('fs');
const options = {
  quality: 'highestaudio',
  filter: 'audioonly'
};

module.exports.options = options;
module.exports.downloadSong = function (session, socket, songRequestData) {
  let url = 'http://www.youtube.com/watch?v=' + songRequestData.key;

  if (canResolveFromFs(songRequestData.key))
    socket.emit('receiveSongChunk:' + songRequestData.key,
      fs.readFileSync(`../Data/${songRequestData.key}.mp3`));
  else
    getTotalSize(url, options)
      .then(size => splitToChunks(url, size, options))
      .then(buffer => {
        socket.emit('receiveSongChunk:' + songRequestData.key, buffer);
        fs.createWriteStream(`../Data/${songRequestData.key}.mp3`).write(buffer);
      });
}

function canResolveFromFs(key) {
  return fs.readdirSync('../Data').find(e => e.indexOf(key) != -1) != undefined;
}

function getTotalSize(url, options) {
  return new Promise((res, rej) => {
    let s = ytdl(url, options);
    s.on('error', () => { });
    s.on('progress', (a, b, c) => {
      s.end();
      res(c);
    });
  });
}

function splitToChunks(url, totalSize, options) {
  let chunkSize = 368640; // roughly 10 sec @ 128kps
  // for streaming to the front-end the chunk size must be about 368640 / 5 ~~ 10 sec of playtime at lowest audio quality
  let promises = [];

  for (let i = 0; chunkSize * i < totalSize; i++) {
    promises.push(getChunk(url, chunkSize, {
      quality: options.quality,
      filter: options.filter,
      range: {
        start: chunkSize * i,
        end: Math.min(chunkSize * (i + 1) - 1, totalSize - 1)
      }
    }));
  }

  return new Promise(resolve => {
    Promise.all(promises)
      .then(chunks => resolve(Buffer.concat(chunks, totalSize)));
  });
}

function getChunk(url, chunkSize, options) {
  return new Promise(resolve => {
    let s = ytdl(url, options);
    let res = [];
    s.on('data', data => res.push(data));
    s.on('finish', () => resolve(Buffer.concat(res, chunkSize)));
  });
}