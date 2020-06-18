import Ytdl from 'ytdl-core';
import { Writable } from 'stream';
import WebmByteStream from 'webm-byte-stream';
import FFmpeg from 'fluent-ffmpeg';
import WebSocket from 'ws';
import config from '../config.js';

const URL = 'https://www.youtube.com/watch?v=FK91w16eJ48';

const options = {
  format: 'audiovideo',
  quality: 'highestaudio'
}

function createFFmpegCommand(inputStream, outputStream) {
  return FFmpeg()
    .input(inputStream)
    .inputOption('-re')
    .noVideo()
    .audioCodec('opus')
    .outputFormat('webm')
    .output(outputStream);
}

class SongStream extends Writable {
  INITIALIZATION_SEGMENT = 'Initialization Segment';
  MEDIA_SEGMENT = 'Media Segment';
  DATA = 'data';

  webmStream = null;
  initializationSegment = null;

  dataCallbacks = [];

  constructor() {
    super();
    this.webmStream = new WebmByteStream();
    this.webmStream.on(this.INITIALIZATION_SEGMENT, data => {
      this.initializationSegment = data;
      this.dataCallbacks.forEach(cb => cb(data));
    });
    this.webmStream.on(this.MEDIA_SEGMENT, data => {
      this.dataCallbacks.forEach(cb => cb(data.cluster));
    });
  }

  write(data) {
    this.webmStream.write(data);
  }

  on(event, callback) {
    if (event === this.DATA) {
      this.dataCallbacks.push(callback);
    }
  }

  hasInitializationSegment() {
    return this.initializationSegment != null;
  }

  getInitializationSegment() {
    return this.initializationSegment;
  }
}

const songStream = new SongStream();
const streamCmd = createFFmpegCommand(Ytdl(URL, options), songStream);
streamCmd.run();

const server = new WebSocket.Server({
  port: config["streaming-service"].port
});

server.on("listening", _ => console.log(`[ws]: Server listening`));

server.on("connection", (socket, request) => {
  console.log(`[ws]: Client connected`);

  if (songStream.hasInitializationSegment()) {
    socket.send(songStream.getInitializationSegment());
  }

  songStream.on(songStream.DATA, data => socket.send(data));
});