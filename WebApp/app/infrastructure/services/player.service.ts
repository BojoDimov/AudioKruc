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

  play(audioBuffer: AudioBuffer) {
    this.clearSource();
    this.source = this.audioContext.createBufferSource();
    this.source.connect(this.audioContext.destination);
    this.source.buffer = audioBuffer;
    this.source.start(0);
  }

  private clearSource() {
    try {
      this.source.stop()
    }
    catch (e) {

    }
    finally {
      this.source = null;
    }
  }
}