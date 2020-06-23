import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { timer, Subject, Subscription } from 'rxjs';
import { tap, filter, map, publish } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('audio')
  // audioElement: ElementRef<HTMLAudioElement>;

  @Input('audioDataChannel')
  audioDataChannel: Subject<any>;

  mediaSource: MediaSource;
  mediaSourceBuffer: SourceBuffer;

  audioCtx: AudioContext;
  source: MediaElementAudioSourceNode;
  analyzer: AnalyserNode;

  fps: number = 24;
  size: number = 512;

  emission$ = timer(0, 1000 / this.fps)
    .pipe(
      filter(_ => this.audioCtx.state === 'running' && this.audioDataChannel !== undefined),
      map(_ => this.collectAudioData())
    );

  private _subscription: Subscription;

  socket: WebSocket;

  constructor() {

  }

  ngOnInit(): void {
    this._subscription = this.emission$.subscribe(data => this.audioDataChannel.next(data));
  }

  ngAfterViewInit(): void {
    this.mediaSource = new MediaSource();
    this.audioCtx = new (window.AudioContext || (<any>window).webkitAudioContext)();

    let audioElement = document.createElement('audio');
    audioElement.src = URL.createObjectURL(this.mediaSource);
    audioElement.play();
    //document.body.appendChild(audioElement);


    //this.audioElement.nativeElement.src = URL.createObjectURL(this.mediaSource);
    //this.mediaSource.addEventListener('sourceopen', (ev) => this.loadMedia());

    if (this.audioCtx) {
      this.source = this.audioCtx.createMediaElementSource(audioElement);
      this.analyzer = this.audioCtx.createAnalyser();
      this.analyzer.fftSize = this.size;
      this.analyzer.smoothingTimeConstant = 1;

      this.source.connect(this.analyzer);
      this.analyzer.connect(this.audioCtx.destination);
    }
  }

  async loadMedia() {
    this.mediaSourceBuffer = this.mediaSource.addSourceBuffer('audio/webm; codecs="opus"');
    this.mediaSourceBuffer.mode = 'sequence';

    this.audioCtx.resume();
    //this.audioElement.nativeElement.play();

    let buffer = null;

    this.mediaSourceBuffer.addEventListener('updateend', () => {
      if (buffer != null) {
        this.mediaSourceBuffer.appendBuffer(buffer);
        buffer = null;
      }
    });

    this.socket = new WebSocket('ws://localhost:10003/4');
    this.socket.onmessage = async (ev) => {
      let segment = await ev.data['arrayBuffer']();
      if (buffer != null) {
        buffer = new Uint8Array([...buffer, ...segment]).buffer;
      } else {
        buffer = segment;
      }

      if (!this.mediaSourceBuffer.updating) {
        this.mediaSourceBuffer.appendBuffer(buffer);
        buffer = null;
      }
    }

    // this.socket.onmessage = async (ev) => {
    //   if (typeof ev.data === 'string') {
    //     let format = JSON.parse(ev.data).data;

    //     // if (this.mediaSourceBuffer) {
    //     //   this.mediaSource.removeSourceBuffer(this.mediaSourceBuffer);
    //     // }

    //     this.mediaSourceBuffer = this.mediaSource.addSourceBuffer(format.mimeType);
    //     this.audioCtx.resume();
    //     this.audioElement.nativeElement.play();
    //   }
    //   else if (ev.data instanceof Blob) {
    //     if (this.mediaSourceBuffer) {
    //       let data = await ev.data['arrayBuffer']();
    //       this.mediaSourceBuffer.appendBuffer(data);
    //     }
    //   }
    // }
  }

  ngOnDestroy() {
    if (this._subscription)
      this._subscription.unsubscribe();
  }

  resumeContext() {
    this.audioCtx.resume();
  }

  collectAudioData() {
    let data = new Float32Array(this.analyzer.frequencyBinCount);
    this.analyzer.getFloatTimeDomainData(data);
    return data;
  }
}
