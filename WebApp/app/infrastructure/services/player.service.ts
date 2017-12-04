import { Injectable, EventEmitter } from '@angular/core';
import { AudioItem } from '../models/audio-item.model';

@Injectable()
export class PlayerService {
  audioContext: AudioContext = null;
  source: AudioBufferSourceNode = null;

  constructor() {
    this.init();
  }

  init() {
    this.audioContext = new AudioContext();
  }

  decode(buffer: ArrayBuffer) {
    return this.audioContext.decodeAudioData(buffer);
  }

  play(song: AudioItem) {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = song.buffer;
    this.source.connect(this.audioContext.destination);
    this.source.start(0);
  }
}