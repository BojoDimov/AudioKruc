import { Injectable } from '@angular/core';

import { AudioItem } from '../models/audio-item.model';

@Injectable()
export class SessionService {
  songs: AudioItem[] = [];

  addSong(song: AudioItem) {
    console.log(song);
    this.songs.push(song);
  }
} 