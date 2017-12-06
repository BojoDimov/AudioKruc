import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketFetchService {
  private socket = null;

  constructor() {
    this.socket = io('http://localhost:12909');
  }

  fetch(key: string): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      this.socket.emit('song', key, buffer => resolve(buffer));
      // this.socket.on('responseSong', res => resolve(res));
      // this.socket.on('error', err => reject(err));
    });
  }
}
