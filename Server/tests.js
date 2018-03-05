let fs = require('fs');
let download = require('./audio-stream').download;
let url = 'https://www.youtube.com/watch?v=B2m_WnXjqnM';

//normalDownload(url);
chunkDownload(url);
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