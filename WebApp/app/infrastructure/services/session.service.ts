import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { AudioItem } from '../models/audio-item.model';

@Injectable()
export class SessionService {
  songs: AudioItem[] = [];
  socket = io('http://localhost:12909');

  addSong(song: AudioItem) {
    console.log(song);
    this.songs.push(song);
    return song;
  }
} 