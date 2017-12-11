import { Injectable, EventEmitter } from '@angular/core';
import { AudioItem } from '../models/audio-item.model';

import { SessionService } from '../infrastructure.barrel';

@Injectable()
export class PlayerService {
  public audioContext: AudioContext = null;
  source: AudioBufferSourceNode = null;
  gain: GainNode = null;
  startedPlaying = 0;
  offsetPercent = 0;

  public flags = {
    active: false,
    finished: false
  };

  constructor(
    private session: SessionService
  ) {
    this.init();
  }

  init() {
    this.audioContext = new AudioContext();
    this.gain = this.audioContext.createGain();
    this.gain.connect(this.audioContext.destination);

    this.gain.gain.value = this.gain.gain.defaultValue * this.session.defaults.volume / 100;
  }

  decode(buffer: ArrayBuffer) {
    return this.audioContext.decodeAudioData(buffer);
  }

  initSource() {
    this.clearSource();
    this.source = this.audioContext.createBufferSource();
    this.source.connect(this.gain);
  }

  initFlags() {
    this.flags = {
      active: true,
      finished: false
    };
  }

  play(audioBuffer: AudioBuffer, offsetPercent = 0) {
    this.initSource();
    this.initFlags();
    this.resume();
    this.source.buffer = audioBuffer;
    this.source.start(0, this.source.buffer.duration * offsetPercent);
    this.startedPlaying = this.audioContext.currentTime;
    this.offsetPercent = offsetPercent;
  }

  pause() {
    if (this.flags.active && this.audioContext.state === 'running')
      this.audioContext.suspend();
  }

  resume() {
    if (this.audioContext.state === 'suspended')
      this.audioContext.resume();
  }

  volume(percent: number) {
    if (this.gain)
      this.gain.gain.value = this.gain.gain.defaultValue * percent / 100;
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