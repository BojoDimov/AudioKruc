import { Injectable } from '@angular/core';

import { AudioItem, SessionService, PlayerService } from './infrastructure.barrel';

@Injectable()
export class AudioStreamService {
  audioItemReference: AudioItem;

  constructor(
    private session: SessionService,
    private player: PlayerService
  ) { }

  fetch(key: string): Promise<AudioBuffer> {
    let audioItem = this.session.songs.find(song => song.key == key);
    //if (audioItem)
    //return Promise.resolve(audioItem.buffer);
    this.session.socket.on('receiveSongChunk', data => {
      let audioItem = this.session.songs.find(song => song.key == data.key);
      let oldData = audioItem.buffer.getChannelData(0);
      audioItem.buffer.getChannelData(0).buffer = new ArrayBuffer(oldData.length * 2);
      audioItem.buffer.getChannelData(0).set(data.buffer);
    });

    return this.socketEmitToPromise({ key: key, offset: 0 })
      .then(buffer => this.player.decode(buffer));
  }

  socketEmitToPromise(data): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      this.session.socket.emit('requestSong', data, resolve);
    });
  }
}