import { Injectable } from '@angular/core';
import {
  SessionService,
  AudioItem,
  AudioSource
} from "../infrastructure.barrel";

@Injectable()
export class FetchService {
  context: AudioContext;

  constructor(
    private session: SessionService
  ) { }

  init(ctx: AudioContext) {
    this.context = ctx;
  }

  load(item: AudioItem): Promise<AudioSource> {
    let audioSource = new AudioSource();
    audioSource.name = item.name;
    this.session.pending = true;
    this.session.socket.emit('requestSong', item);

    return new Promise((res, rej) => {
      this.session.socket.on('receiveSong:' + item.key, song => {
        this.context.decodeAudioData(song)
          .then(buffer => {
            this.session.pending = false;
            audioSource.buffer = buffer;
            audioSource.duration = buffer.duration;
            res(audioSource);
          });
      });
    });
  }

  load2(): Promise<ArrayBuffer> {
    return new Promise((res, rej) => { });
  }
}