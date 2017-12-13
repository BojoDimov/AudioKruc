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
    this.volume = session.defaults.volume;
    this.ticker = setInterval(this.tick.bind(this), 100);

    $(document).on("click", "#progress-bar", function (e) {
      let newWidth = e.pageX - $(this).offset().left;
      let totWidth = $(this).width();
      $("#progress").width(newWidth);
      playerService.seek(newWidth / totWidth);
    });
  }

  tick() {
    $("#progress").width($("#progress-bar").width() * this.playerService.calculateProgress());
  }

  showProgress() {
    return $("#progress").width() <= 0;
  }

  changeVolume(value) {
    this.playerService.volume(value);
  }
}