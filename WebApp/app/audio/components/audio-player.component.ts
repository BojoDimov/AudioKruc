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
    public player: PlayerService,
    public session: SessionService
  ) {
    this.volume = session.defaults.volume;
    this.ticker = setInterval(this.tick.bind(this), 100);

    $(document).on("click", "#progress-bar", function (e) {
      let newWidth = e.pageX - $(this).offset().left;
      let totWidth = $(this).width();
      $("#progress").width(newWidth);
      player.seek(newWidth / totWidth);
    });
  }

  tick() {
    let progress = this.player.calculateProgress();
    if (progress < 1)
      $("#progress").width($("#progress-bar").width() * progress);
    else
      this.player.notify('end');
  }

  showProgress() {
    return $("#progress").width() <= 0;
  }

  changeVolume(value) {
    this.player.volume(value);
  }

  nextSong() {
    if (this.session.canPlayNext())
      this.player.play(this.session.queue[++this.session.currentSong]);
  }

  prevSong() {
    if (this.session.canPlayPrev())
      this.player.play(this.session.queue[--this.session.currentSong]);
  }
}