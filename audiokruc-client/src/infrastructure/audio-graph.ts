import { timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class AudioGraph {
  private ctx: AudioContext;
  private source: MediaElementAudioSourceNode;
  private gain: GainNode;
  private analyser: AnalyserNode;

  fftSize = 512;
  analyserFps = 24;

  analyser$ = timer(0, 1000 / this.analyserFps)
    .pipe(
      filter(_ => this.ctx.state === 'running'),
      map(_ => this.getAnalyserData())
    );

  constructor() {
    this.ctx = new (window.AudioContext || (<any>window).webkitAudioContext)();
    this.gain = this.ctx.createGain();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = this.fftSize;
    this.analyser.smoothingTimeConstant = 1;
  }

  connect(element: HTMLAudioElement) {
    this.source = this.ctx.createMediaElementSource(element);
    this.source
      .connect(this.analyser)
      .connect(this.gain)
      .connect(this.ctx.destination);
  }

  private getAnalyserData() {
    let data = new Float32Array(this.analyser.frequencyBinCount);
    this.analyser.getFloatTimeDomainData(data);
    return data;
  }
}