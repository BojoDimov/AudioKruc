import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { AudioItem, AudioQueueItem } from '../infrastructure.barrel';
import { SearchItem } from "../../youtube/youtube-search.barrel";
import { EventEmitter } from "events";

@Injectable()
export class SessionService {
  songs: AudioItem[] = [];
  queue: AudioQueueItem[] = [];
  queueIndex = -1;
  currentSong: AudioItem = null;
  socket = io('http://localhost:12909');
  pending = false;
  autoplay = false;
  sessionId = 0;
  showSearchResults = true;
  showQueue = true;
  events = new EventEmitter();

  constructor() {
    this.socket.on('session', data => {
      console.log('Received session', data);
      this.sessionId = data.sessionId;
      console.log('Created session:' + data.sessionId)
      this.events.emit('session-init', data.sessionId);
    });
  }

  ytSearchItems: SearchItem[] = [];
  defaults = {
    volume: 60
  };

  addSong(song: AudioItem) {
    this.songs.push(song);
  }
} 