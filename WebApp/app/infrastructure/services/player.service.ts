import { Injectable, EventEmitter } from '@angular/core';
import {
  SessionService,
  FetchService,
  AudioItem,
  AudioSource
} from '../infrastructure.barrel';

@Injectable()
export class PlayerService {
  public audioContext: AudioContext = null;
  public analyzer: AnalyserNode;
  source: AudioBufferSourceNode = null;
  gain: GainNode = null;

  public current: AudioSource = null;

  public flags = {
    active: false,
    finished: false
  };

  constructor(
    private session: SessionService,
    private data: FetchService
  ) {
    this.init();
    data.init(this.audioContext);
  }

  init() {
    this.audioContext = new AudioContext();
    this.analyzer = this.audioContext.createAnalyser();
    this.gain = this.audioContext.createGain();
    this.analyzer.connect(this.gain);
    this.gain.connect(this.audioContext.destination);

    this.analyzer.fftSize = 2048;
    this.gain.gain.value = this.gain.gain.defaultValue * this.session.defaults.volume / 100;
  }

  initSource(audioSource: AudioSource) {
    this.clearSource();
    this.source = this.audioContext.createBufferSource();
    this.source.connect(this.analyzer);
    this.source.buffer = audioSource.buffer;
    this.current = audioSource;
  }

  initFlags() {
    this.flags = {
      active: true,
      finished: false
    };
  }

  isPlaying() {
    return this.flags.active && !this.flags.finished;
  }

  play(item: AudioItem) {
    this.data.load(item)
      .then(source => this._play(source));
  }

  seek(percent: number) {
    if (!this.current)
      return;

    this.initSource(this.current);
    this.initFlags();
    this.resume();
    this.source.start(0, this.source.buffer.duration * percent);
    this.current.startedPlaying = this.audioContext.currentTime;
    this.current.offsetPercent = percent;
  }

  private _play(source: AudioSource) {
    this.initSource(source);
    this.initFlags();
    this.resume();
    this.source.start(0);
    this.current.startedPlaying = this.audioContext.currentTime;
  }

  // play_old(audioBuffer: AudioBuffer, offsetPercent = 0) {
  //   this.initSource();
  //   this.initFlags();
  //   this.resume();
  //   this.source.buffer = audioBuffer;
  //   this.source.start(0, this.source.buffer.duration * offsetPercent);
  //   this.startedPlaying = this.audioContext.currentTime;
  //   this.offsetPercent = offsetPercent;
  // }

  pause() {
    if (this.flags.active && this.audioContext.state === 'running')
      this.audioContext.suspend();
  }

  resume() {
    if (this.audioContext.state === 'suspended')
      this.audioContext.resume();
  }

  replay() {
    if (this.flags.finished && this.current) {
      this._play(this.current);
    }
  }

  volume(percent: number) {
    if (this.gain)
      this.gain.gain.value = this.gain.gain.defaultValue * percent / 100;
  }

  calculateProgress() {
    // returns progress as double
    if (!this.source)
      return 0;
    let progress = ((this.audioContext.currentTime - this.current.startedPlaying + this.current.offsetPercent * this.source.buffer.duration) / this.source.buffer.duration)
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

  notify(event: 'end') {
    if (this.flags.active)
      this.flags.finished = true;
  }
}

export enum PlayerState {
  playing,
  paused,
  finished,
  inactive
}