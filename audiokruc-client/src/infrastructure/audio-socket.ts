import { Subject } from 'rxjs';

export enum AudioSocketEvent {
  SONG_PLAY = 'song-play',
  SONG_PAUSE = 'song-stop'
}

export class AudioSocket {
  socket: WebSocket;

  arrayBuffer$: Subject<ArrayBuffer> = new Subject<ArrayBuffer>();
  exception$: Subject<any> = new Subject<any>();

  constructor(private url: string) { }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => null;
    this.socket.onclose = () => null;

    this.socket.onerror = (ev: Event) => this.exception$.next(ev);

    this.socket.onmessage = async (ev: MessageEvent) => {
      if (typeof ev.data === 'string') {
        let message = JSON.parse(ev.data);
      }
      else if (ev.data instanceof Blob) {
        this.arrayBuffer$.next(await (<any>ev.data)['arrayBuffer']());
      }
    }
  }

  disconnect() {
    this.socket.close();
  }

  release() {
    this.socket.close();
    this.arrayBuffer$.complete();
    this.exception$.complete();
  }
}