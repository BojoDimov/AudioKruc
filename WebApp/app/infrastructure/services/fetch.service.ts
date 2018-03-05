import { Injectable, ReflectiveInjector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SessionService, AudioItem, AudioSource } from "../infrastructure.barrel";

@Injectable()
export class FetchService {
  loadThreshhold = .7;
  chunkSize = 20; //seconds
  context: AudioContext;

  constructor(
    private session: SessionService
  ) { }

  init(ctx: AudioContext) {
    this.context = ctx;
  }

  // get(item: AudioItem): Promise<AudioBufferSourceNode> {
  //   return new Promise<AudioSource>((res, rej) => {
  //     let audioSource = new AudioSource();
  //     res(audioSource);
  //     let loadInterval = setInterval(this.load.bind(this), 1000);
  //   });
  // }

  load(item: AudioItem) {
    let audioSource = new AudioSource();
    let node = this.context.createBufferSource();
    node.buffer = audioSource.buffer;


    this.loadChunk(audioSource, 0)
      .then(() => {
      })
  }

  _load(source: AudioSource) {
    //find current interval
    let chunk = source.loaded.find(e => e.start <= source.current && e.end >= source.current);
    if (!chunk) {
      //load first part
    } else if ((source.current - chunk.start) / (chunk.end - chunk.start) > this.loadThreshhold) {
      //load next part
    }
  }

  loadChunk(item: AudioSource, start: number) {
    return new Promise<ArrayBuffer>((res, rej) => res(new ArrayBuffer(1024)));
  }
}