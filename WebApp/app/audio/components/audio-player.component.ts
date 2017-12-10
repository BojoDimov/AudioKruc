import { Component } from '@angular/core';
import { PlayerService } from '../../infrastructure/services/player.service';

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
  }

  tick() {
    this.progress = this.playerService.calculateProgress() * 100;
  }

  seek(e) {
    debugger;

    console.log(e);
    let widthClicked = e.offsetX;
    let w = e.target.clientX - e.clientX;
    let tw = e.target.clientWidth;
    // console.log("Target width:", e.target.offsetWidth);
    // console.log("Offset:", e.offsetX);
    console.log("Seek percentage:", w / tw);
    this.playerService.seek(w / tw);
  }
}