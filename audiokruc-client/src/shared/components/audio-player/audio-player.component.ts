import { Component, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { MseWrapper } from 'src/infrastructure/mse-wrapper';
import { AudioSocket } from 'src/infrastructure/audio-socket';
import { AudioGraph } from 'src/infrastructure/audio-graph';

@Component({
  selector: 'ak-audio-player',
  templateUrl: './audio-player.component.html',
  styles: []
})
export class AudioPlayerComponent implements AfterViewInit, OnDestroy {
  @Input('src')
  src: string;

  @Input('mimeType')
  mimeType: string = 'audio/webm; codecs="opus"';

  audioElement: HTMLAudioElement;

  connection: AudioSocket;
  mse: MseWrapper;
  graph: AudioGraph;

  ngAfterViewInit() {
    this.audioElement = document.createElement('audio');
    this.audioElement.setAttribute('style', 'display: none');

    this.connection = new AudioSocket(this.src);

    this.mse = new MseWrapper(this.mimeType, this.connection.arrayBuffer$);
    this.audioElement.src = this.mse.createObjectURL();

    this.graph = new AudioGraph();
    this.graph.connect(this.audioElement);

    document.body.appendChild(this.audioElement);
  }

  connect() {
    this.connection.connect();
  }

  play() {

  }

  pause() {

  }

  ngOnDestroy() {
    this.connection.release();
    this.mse.release();
    document.body.removeChild(this.audioElement);
  }
}
