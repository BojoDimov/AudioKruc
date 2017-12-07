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
    song.node.connect(this.audioContext.destination);
    song.node.start(0);
  }
}