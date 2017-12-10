import { Injectable, EventEmitter } from '@angular/core';
import { AudioItem } from '../models/audio-item.model';

@Injectable()
export class PlayerService {
  audioContext: AudioContext = null;
  source: AudioBufferSourceNode = null;
  startedPlaying = 0;
  offsetPercent = 0;

  constructor() {
    this.init();
  }

  init() {
    this.audioContext = new AudioContext();
  }

  decode(buffer: ArrayBuffer) {
    return this.audioContext.decodeAudioData(buffer);
  }

  play(audioBuffer: AudioBuffer, offsetPercent = 0) {
    this.clearSource();
    this.source = this.audioContext.createBufferSource();
    this.source.connect(this.audioContext.destination);
    this.source.buffer = audioBuffer;
    this.source.start(0, this.source.buffer.duration * offsetPercent);
    this.startedPlaying = this.audioContext.currentTime;
    this.offsetPercent = offsetPercent;
  }

  seek(percent: number) {
    if (!this.source)
      return;
    let buffer = this.source.buffer;
    this.play(buffer, percent);
  }

  calculateProgress() {
    // returns progress as double
    if (!this.source)
      return 0;
    let progress = ((this.audioContext.currentTime - this.startedPlaying + this.offsetPercent * this.source.buffer.duration) / this.source.buffer.duration)
    //console.log("Progress:", progress);
    return progress;
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