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
    return new Promise<AudioItem>((resolve, reject) => {
      let audioItem = new AudioItem();
      audioItem.name = title;
      audioItem.key = key;

      this.session.socket.emit('requestSong', { key: key });

      this.session.socket.on('receiveSongChunk:' + key, chunk => {
        this.player.audioContext.decodeAudioData(chunk)
          .then(audioBuffer => {
            let node = this.player.audioContext.createBufferSource();
            node.buffer = audioBuffer;
            audioItem.node = node;
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