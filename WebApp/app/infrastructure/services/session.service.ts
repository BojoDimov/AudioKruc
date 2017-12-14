import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { AudioItem } from '../models/audio-item.model';

@Injectable()
export class SessionService {
  songs: AudioItem[] = [];
  queue: AudioItem[] = [];
  queueIndex = -1;
  currentSong: AudioItem = null;
  socket = io('http://localhost:12909');

  defaults = {
    volume: 60
  };

  addSong(song: AudioItem, immediatePlay = false) {
    this.songs.push(song);
    this.currentSong = song;
  }
} 