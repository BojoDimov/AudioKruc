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
    let progress = this.playerService.calculateProgress();
    if (progress < 1)
      $("#progress").width($("#progress-bar").width() * progress);
    else
      this.playerService.notify('end');
  }

  showProgress() {
    return $("#progress").width() <= 0;
  }

  changeVolume(value) {
    this.playerService.volume(value);
  }

  nextSong() {
    if (this.session.queueIndex + 1 < this.session.queue.length) {
      this.session.queueIndex++;
      this.session.currentSong = this.session.songs[this.session.queue[this.session.queueIndex].index];
      this.playerService.play(this.session.currentSong.buffer);
    }

  }

  prevSong() {
    if (this.session.queueIndex - 1 >= 0) {
      this.session.queueIndex--;
      this.session.currentSong = this.session.songs[this.session.queue[this.session.queueIndex].index];
      this.playerService.play(this.session.currentSong.buffer);
    }
  }
}