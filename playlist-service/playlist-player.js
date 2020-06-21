import FFmpeg from 'fluent-ffmpeg';
import { Writable } from 'stream';

export class PlaylistPlayer {
  socket = null;
  playlist = null;

  constructor(socket, playlist) {
    this.socket = socket;
    this.playlist = playlist;
  }

  play() {
    if (!this.playlist.songs || this.playlist.songs.length == 0) {
      return;
    }

    console.log(`[playlist-player]: Playing file ${this.playlist.songs[0].path}`)

    createFFmpegCommand(this.playlist.songs[0].path, new SocketStream(this.socket));
  }
}

class SocketStream extends Writable {
  socket = null;
  constructor(socket) {
    super();
    this.socket = socket;
  }

  _write(data) {
    if (this.socket) {
      this.socket.send(data);
    }
  }
}

function createFFmpegCommand(input, outputStream) {
  return FFmpeg()
    .input(input)
    .inputOption('-re')
    .noVideo()
    .audioCodec('opus')
    .outputFormat('webm')
    .output(outputStream);
}