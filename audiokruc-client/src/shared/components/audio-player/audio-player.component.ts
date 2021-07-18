import { Component, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { MseWrapper } from 'src/infrastructure/mse-wrapper';
import { AudioSocket } from 'src/infrastructure/audio-socket';
import { AudioGraph } from 'src/infrastructure/audio-graph';

enum PlayerState {
  paused = 'paused',
  playing = 'playing',
  stopped = 'stopped',
  connecting = 'connecting'
}

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
  graph: AudioGraph = new AudioGraph();

  PlayerState = PlayerState;

  state: PlayerState = PlayerState.stopped;

  ngAfterViewInit() {
    this.audioElement = document.createElement('audio');

    this.connection = new AudioSocket(this.src);

    this.mse = new MseWrapper(this.mimeType, this.connection.arrayBuffer$);
    this.audioElement.src = this.mse.createObjectURL();

    this.graph.connect(this.audioElement);

    //document.body.appendChild(this.audioElement);
  }

  play() {
    this.connection.connect();
    this.audioElement.play();
    this.state = PlayerState.playing;
  }

  pause() {
    this.state = PlayerState.paused;
  }

  ngOnDestroy() {
    this.connection.release();
    this.mse.release();
    document.body.removeChild(this.audioElement);
  }
}
