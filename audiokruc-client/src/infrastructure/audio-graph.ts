import { timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class AudioGraph {
  private ctx: AudioContext;
  private source: MediaElementAudioSourceNode;
  private gain: GainNode;
  private analyser: AnalyserNode;

  fftSize = 64;
  analyserFps = 24;

  analyser$ = timer(0, 1000 / this.analyserFps)
    .pipe(
      filter(_ => this.ctx && this.ctx.state === 'running'),
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
    this.ctx.resume();
  }

  private getAnalyserData(): number[] {
    let data = new Uint8Array(this.analyser.frequencyBinCount);
    let result = new Array<number>(this.analyser.frequencyBinCount);

    this.analyser.getByteTimeDomainData(data);
    //this.analyser.getByteFrequencyData(data);

    let lowerBound = Math.round(20 / 100 * data.length);
    let upperBound = Math.round(data.length - 40 / 100 * data.length);

    return Array.prototype.slice.call(data, 0).map((freq: number) => freq / 255);
    //return Array.prototype.slice.call(data, 0).map((freq: number) => freq / 255);
  }
}