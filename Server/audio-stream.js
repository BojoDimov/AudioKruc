let ytdl = require('ytdl-core');

module.exports.download = function (url, options) {
  return getTotalSize(url, options)
    .then(size => splitToChunks(url, size, options));
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
  let chunkSize = 786432;
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