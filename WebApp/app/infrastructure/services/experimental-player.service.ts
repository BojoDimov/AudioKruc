import { Injectable, AfterViewInit } from "@angular/core";
import { FetchService } from "../infrastructure.barrel";

@Injectable()
export class ExperimentalPlayerService implements AfterViewInit {
  audio: HTMLMediaElement;

  constructor(private data: FetchService) { }

  ngAfterViewInit() {
    this.audio = document.querySelector('audio');
    let mimeCodec = 'audio/mp4; codecs="mp4a.40.2"';
    let mediaSource = new MediaSource();
    this.audio.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', () => {
      let sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
      this.data.load2()
        .then(buff => {
          sourceBuffer.appendBuffer(buff);
          sourceBuffer.addEventListener('updateend', () => {
            mediaSource.endOfStream();
            this.audio.play()
          });
        });
    });
  }
}