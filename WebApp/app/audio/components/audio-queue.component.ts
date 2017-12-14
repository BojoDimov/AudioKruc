import { Component } from '@angular/core';
import { SessionService, PlayerService, AudioQueueItem } from '../../infrastructure/infrastructure.barrel';

@Component({
  selector: 'ak-audio-queue',
  templateUrl: './audio-queue.component.html'
})
export class AudioQueueComponent {
  nextSongInterval = null;
  constructor(
    public session: SessionService,
    private player: PlayerService
  ) {
    this.nextSongInterval = setInterval(this.tick.bind(this), 5000);
  }

  tick() {
    if (this.player.calculateProgress() >= 1) {
    }
  }

  play(item: AudioQueueItem, queueIndex: number) {
    let song = this.session.songs[item.index];
    this.player.play(song.buffer);
    this.session.currentSong = song;
    this.session.queueIndex = queueIndex;
  }

  remove(item: AudioQueueItem, queueIndex: number) {
    this.session.queue.splice(queueIndex, 1);
    this.session.queueIndex = -1;
  }
}