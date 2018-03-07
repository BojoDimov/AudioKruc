const ytdl = require('ytdl-core');
let url = 'https://www.youtube.com/watch?v=B2m_WnXjqnM';
let options = {
  itag: 140
};

//itag = 140 - 'audio/mp4; codecs="mp4a.40.2"', aac, 128kbps

// ytdl.getInfo(url)
//   .then(info => console.log(info.formats));
// .filter(e => e.audioEncoding == "mp3")
// .map(f => {
//   return {
//     type: f.type,
//     container: f.container,
//     audioEncoding: f.audioEncoding,
//     audioBitrate: f.audioBitrate,
//     itag: f.itag
//   };
// })));

let stream = ytdl(url, { quality: '140' });

stream.on('info', info => console.log(info.formats));
stream.on('response', res => console.log(res));
