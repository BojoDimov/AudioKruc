import { Injectable } from '@angular/core';
import * as Writable from 'web-audio-stream/writable';

import { AudioItem, AudioStreamableItem, SessionService, PlayerService } from '../infrastructure.barrel';

@Injectable()
export class AudioStreamService {
  audioItemReference: AudioItem;

  constructor(
    private session: SessionService,
    private player: PlayerService
  ) { }

  fetch(title: string, key: string): Promise<AudioItem> {
    this.player.flags.pending = true;
    return new Promise<AudioItem>((resolve, reject) => {
      let audioItem = this.session.songs.find(song => song.key == key);
      if (audioItem) {
        resolve(audioItem);
      }

      audioItem = new AudioItem();
      audioItem.name = title;
      audioItem.key = key;
      this.session.addSong(audioItem, true);

      this.session.socket.emit('requestSong', { key: key });

      this.session.socket.on('receiveSongChunk:' + key, chunk => {
        this.player.audioContext.decodeAudioData(chunk)
          .then(audioBuffer => {
            audioItem.buffer = audioBuffer;
            resolve(audioItem);
          })
          .catch(err => reject(err));
      });
    })
  }

  fetchStreamable(title: string, key: string): Promise<AudioStreamableItem> {
    let audioItem = new AudioStreamableItem();
    audioItem.name = title;
    audioItem.key = key;
    audioItem.stream = Writable(this.player.audioContext.destination);

    this.session.socket.emit('requestSong', { key: key });
    this.session.socket.on('receiveSongChunk:' + key, chunk => {
      this.player.audioContext.decodeAudioData(chunk)
        .then(audioBuffer => audioItem.stream.write(audioBuffer));
    });

    return Promise.resolve(audioItem);
  }
}