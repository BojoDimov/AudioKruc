let fs = require('fs');
let ytdl = require('ytdl-core');
let download = require('./audio-stream').download;
let url = 'https://www.youtube.com/watch?v=B2m_WnXjqnM';

//normalDownload(url);
test0(url);
//test1();

function chunkDownload(url) {
  download(url, { quality: 'highestaudio', filter: 'audioonly' })
    .then(buffer => {
      let s = fs.createWriteStream('test3.mp3');
      s.write(buffer);
    });
}

function normalDownload(url) {
  let start = new Date();
  let stream = ytdl(url, { quality: 'highestaudio', filter: 'audioonly' });
  stream.resume();
  stream.on('finish', () => console.log('Normal download elapsed time', new Date() - start));
}

function test0(url) {
  let chunkSize = 368640;
  let options = {
    quality: 'highestaudio',
    filter: 'audioonly',
    range: {
      start: 0,
      end: chunkSize - 1
    }
  };
  let start = new Date();
  let stream = ytdl(url, options);
  stream.resume();
  stream.on('finish', () => console.log('elapsed time', new Date() - start));
}

function test1() {
  let chunkSize = 786432;
  let options = {
    quality: 'lowest',
    filter: 'audioonly',
    range: {
      start: 0,
      end: chunkSize - 1
    }
  };

  options2 = {
    quality: 'lowest',
    filter: 'audioonly',
    range: {
      start: chunkSize,
      end: chunkSize * 2 - 1
    }
  };
  let start = new Date();
  let stream = ytdl(url, options);
  let stream2 = ytdl(url, options2);
  stream.resume();
  stream2.resume();
  stream.on('progress', (a, b, c) => console.log(a, b, c));
  stream.on('finish', () => console.log('elapsed time', new Date() - start));
  stream2.on('finish', () => console.log('elapsed time', new Date() - start));
}


function notifyConnections(connections, songRequestData) {
  connections.forEach(conn => {
    console.log('Emmiting event', 'queue-add:' + conn.sessionId);
    conn.emit('queue-add:' + conn.sessionId, songRequestData)
  });
}

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

function downloadSong() {
  // console.log('Requested song:', songRequestData);
  // let song = songs.find(song => song.key == songRequestData.key);
  // if (song) {
  //   console.log('resolved without downloading');
  //   song.requestedFrom = session;
  //   socket.emit('receiveSongChunk:' + song.key, song.buffer);
  //   if (songRequestData.isInQueue)
  //     queue.emit('add', song);
  //   return;
  // }
  let url = 'http://www.youtube.com/watch?v=' + songRequestData.key;
  return getTotalSize(url, options)
    .then(size => splitToChunks(url, size, options))
    .then(buffer => {
      //console.log('finished downloading');
      //songRequestData.buffer = buffer;
      //songRequestData.requestedFrom = session;
      //songs.push(songRequestData);
      socket.emit('receiveSongChunk:' + songRequestData.key, buffer);
      // if (songRequestData.isInQueue)
      //   queue.emit('add', songRequestData);
    });
}