import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { AudioItem, AudioQueueItem } from '../infrastructure.barrel';
import { SearchItem } from "../../youtube/youtube-search.barrel";

@Injectable()
export class SessionService {
  songs: AudioItem[] = [];
  queue: AudioQueueItem[] = [];
  queueIndex = -1;
  currentSong: AudioItem = null;
  socket = io('http://localhost:12909');
  pending = false;
  autoplay = false;
  showSearchResults = true;
  showQueue = true;

  ytSearchItems: SearchItem[] = [];
  defaults = {
    volume: 60
  };

  addSong(song: AudioItem) {
    this.songs.push(song);
  }
} 