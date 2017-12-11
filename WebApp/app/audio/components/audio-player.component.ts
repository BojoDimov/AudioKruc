import { Component } from '@angular/core';
import { PlayerService, SessionService } from '../../infrastructure/infrastructure.barrel';
import * as $ from 'jquery';

@Component({
  selector: 'ak-audio-player',
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent {
  progress = 0;
  volume = 0;
  ticker = null;

  constructor(
    public playerService: PlayerService,
    public session: SessionService
  ) {
    this.ticker = setInterval(this.tick.bind(this), 100);
    const self = this;

    $(document).on("click", "#progress", function (e) {
      let relWidth = e.pageX - $(this).offset().left;
      let totWidth = $(this).width();
      playerService.seek(relWidth / totWidth);
    });
  }

  tick() {
    this.progress = this.playerService.calculateProgress() * 100;
  }

  volumeChange(e) {
    this.playerService.volume(e.value);
  }
}