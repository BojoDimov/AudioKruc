import { Component, OnDestroy } from '@angular/core';
import { SessionService, PlayerService, AudioItem } from '../../infrastructure/infrastructure.barrel';

@Component({
  selector: 'ak-audio-queue',
  templateUrl: './audio-queue.component.html'
})
export class AudioQueueComponent {
  constructor(
    public session: SessionService,
    private player: PlayerService
  ) { }

  play(index: number) {
    let item = this.session.queue[index];
    this.player.play(item);
    this.session.currentSong = index;
  }

  remove(index: number) {
    this.session.queue.splice(index, 1);
  }
}