import { SongStream, SongStreamEvent } from '../shared/song-stream.js';
import { createFFmpegCommand } from '../shared/ffmpeg.js';

export class PlaylistPlayer {
  socket = null;
  playlist = null;

  current = null;

  constructor(socket, playlist) {
    this.socket = socket;
    this.playlist = playlist;
  }

  setSongStreamBindings(songStream) {
    songStream.on(SongStreamEvent.DATA, data => this.socket.send(data));
    songStream.on(SongStreamEvent.SONG_END, () => this._next());
  }

  play(songId) {
    this._stop();

    if (songId) {
      let index = this.playlist.songs.findIndex(e => e.id == songId);
      this._play(index);
    } else if (this.playlist.songs[0]) {
      this._play(0);
    }
  }

  _stop() {
    if (!this.current) {
      return;
    }

    console.log(`[playlist-player]: Stopping current song`);

    this.current.stream.stop();
    this.current.cmd.kill();
  }

  _play(index) {
    let songStream = new SongStream();
    this.setSongStreamBindings(songStream);

    this.current = {
      index: index,
      song: this.playlist.songs[index],
      cmd: createFFmpegCommand(this.playlist.songs[index].path, songStream),
      stream: songStream
    };

    console.log(`[playlist-player]: Playing song ${this.current.song.name}`);
    this.current.cmd.run();
  }

  _next() {
    if (!this.current && this.playlist.songs && this.playlist.songs.length) {
      this._play(0);
    } else if (this.current && this.playlist.songs.length > this.current.index + 1) {
      this._play(this.current.index + 1);
    }
  }
}