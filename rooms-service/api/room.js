import Ws from 'ws';
import config from '../../config.js';

export default class Room {
  id = 0;
  name = null;
  title = null;
  description = null;
  genre = null;

  streamingService = null;
  clients = [];
  songs = [];

  currentSongIndex = -1;
  currentSong = null;

  constructor(roomCreateModel) {
    this.id = roomCreateModel.id;
    this.name = roomCreateModel.name;
    this.title = roomCreateModel.title;
    this.description = roomCreateModel.description;
    this.genre = roomCreateModel.genre;

    this.connectStreamingService();
  }

  addSong(song) {
    console.log(`[room-${this.name}]: Added song`);
    this.songs.push(song);

    // queue is empty
    if (this.currentSongIndex == -1) {
      this.playSong(this.songs.length - 1);
    }
  }

  getSongs() {
    return this.songs.map(song => {
      return {
        status: song.status,
        ...song.details
      };
    });
  }

  join(socket) {
    this.clients.push(socket);

    if (this.currentSong != null) {
      const currentSongPacket = JSON.stringify({
        type: 'song-play',
        data: this.currentSong.format
      });
      console.log(`[room-${this.name}]: Has current song, sending 'current-song' packet to client`);
      socket.send(currentSongPacket);
    }
  }

  playSong(nextSongIndex) {
    if (this.currentSongIndex != -1) {
      this.songs[this.currentSongIndex].status = 'past';
    }
    this.currentSongIndex = nextSongIndex;
    this.songs[this.currentSongIndex].status = 'current';
    this.currentSong = this.songs[this.currentSongIndex];

    const streamingServicePacket = JSON.stringify({
      type: 'song-play',
      data: {
        info: this.currentSong.info,
        options: this.currentSong.options,
        format: this.currentSong.format
      }
    });

    const clientPacket = JSON.stringify({
      type: 'song-play',
      data: this.currentSong.format
    });

    console.log(`[room-${this.name}]: Playing song at index ${this.currentSongIndex}`);
    this.streamingService.send(streamingServicePacket);
    this.clients.forEach(client => client.send(clientPacket));
  }

  connectStreamingService() {
    this.streamingService = new Ws(`ws://localhost:${config["streaming-service"].port}/${this.name}`);

    this.streamingService.on('error', error => {
      console.log(`[room-${this.name}]: Failed to connect to streaming service: ${error.toString()}`);
    })

    this.streamingService.on('message', message => {
      console.log(`[room-${this.name}]: Received segment`);
      this.clients.forEach(userSocket => userSocket.send(message));
    });
  }
}