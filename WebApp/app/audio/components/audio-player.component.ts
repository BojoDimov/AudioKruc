import { Component } from '@angular/core';
import { PlayerService } from '../../infrastructure/services/player.service';
import * as $ from 'jquery';

@Component({
  selector: 'ak-audio-player',
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent {
  progress = 50;
  ticker = null;
  hideProgress = false;

  constructor(
    private playerService: PlayerService
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
}