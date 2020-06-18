import { Component, AfterViewInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ak-audio-player',
  templateUrl: './audio-player.component.html',
  styles: []
})
export class AudioPlayerComponent implements AfterViewInit {
  @Input('roomId')
  roomId: number;

  audioElement: HTMLAudioElement;

  socket: WebSocket;
  mediaSource: MediaSource;
  mediaSourceBuffer: SourceBuffer;

  audioCtx: AudioContext;
  source: MediaElementAudioSourceNode;
  analyzer: AnalyserNode;

  fftSize = 512;

  ngAfterViewInit(): void {
    this.mediaSource = new MediaSource();
    this.audioCtx = new (window.AudioContext || (<any>window).webkitAudioContext)();

    this.audioElement = document.createElement('audio');
    this.audioElement.setAttribute('style', 'display: none');
    document.body.appendChild(this.audioElement);

    this.audioElement.src = URL.createObjectURL(this.mediaSource);
    this.mediaSource.addEventListener('sourceopen', (ev) => this.loadMedia());

    if (this.audioCtx) {
      this.source = this.audioCtx.createMediaElementSource(this.audioElement);
      this.analyzer = this.audioCtx.createAnalyser();
      this.analyzer.fftSize = this.fftSize;
      this.analyzer.smoothingTimeConstant = 1;

      this.source.connect(this.analyzer);
      this.analyzer.connect(this.audioCtx.destination);
    }
  }

  async loadMedia() {
    this.socket = new WebSocket(`${environment.roomsServiceWs}/${this.roomId}`);

    this.socket.onmessage = async (ev) => {
      if (typeof ev.data === 'string') {
        let format = JSON.parse(ev.data).data;
        console.log('Received song format data', format);
        // if (this.mediaSourceBuffer) {
        //   this.mediaSource.removeSourceBuffer(this.mediaSourceBuffer);
        // }

        this.mediaSourceBuffer = this.mediaSource.addSourceBuffer("audio/mpeg");
        this.audioCtx.resume();
        this.audioElement.play();
      }
      else if (ev.data instanceof Blob) {
        console.log('Received song segment data');
        if (this.mediaSourceBuffer) {
          let data = await (<any>ev.data)['arrayBuffer']();
          this.mediaSourceBuffer.appendBuffer(data);
        }
      }
    }
  }

}
