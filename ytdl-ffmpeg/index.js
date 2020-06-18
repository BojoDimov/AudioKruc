import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import stream from 'stream';
import fs from 'fs';
import webmByteStream from 'webm-byte-stream';

const url = 'https://www.youtube.com/watch?v=HIRNdveLnJI';
const options = {
  quality: 'highestaudio',
  format: 'audioonly'
};

class EchoStream extends stream.Writable {
  sum = 0;
  isFirstChunk = true;
  _write(chunk, enc, next) {
    if (this.isFirstChunk) {
      console.log('Received first chunk:', chunk);
      this.isFirstChunk = false;
    } else {
      console.log('Received chunk', chunk.length);
    }
    next();
  }
}

const input = fs.createReadStream('./media/afterlife.webm')
const output = fs.createWriteStream('./media/afterlife.mp4');
const webmstream = new webmByteStream();

webmstream.on('Initialization Segment', function (data) {
  console.log('Initialization Segment', data);
});

webmstream.on('Media Segment', function (data) {
  console.log('Media Segment', data);
  var cluster = data.cluster,
    timecode = data.timecode,
    duration = data.duration;
  // ...
});

function createFFmpegCommand(inputStream, outputStream) {
  return ffmpeg()
    .input(inputStream)
    .inputOption('-re')
    .noVideo()
    .audioCodec('opus')
    .outputFormat('webm')
    .output(outputStream);
}


createFFmpegCommand(ytdl(url, options), webmstream)
  .on('error', function (err, stdout, stderr) {
    console.log('Cannot process audio: ' + err.message);
  })
  .on('stderr', function (stderrLine) {
    console.log('Stderr output: ' + stderrLine);
  })
  .run();