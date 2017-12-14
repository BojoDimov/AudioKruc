import { Component } from '@angular/core';
import { SessionService, PlayerService, AudioStreamService } from '../../infrastructure/infrastructure.barrel';
import { SearchItem } from "../youtube-search.barrel";

@Component({
  selector: 'ak-youtube-search-result',
  templateUrl: './youtube-search-result.component.html'
})
export class YoutubeSearchResultComponent {
  constructor(
    public session: SessionService,
    private player: PlayerService,
    private audioStream: AudioStreamService
  ) { }

  play(item: SearchItem) {
    this.audioStream.fetch(item.snippet.title, item.id.videoId)
      .then(audioItem => {
        this.player.play(audioItem.buffer)
        this.session.currentSong = audioItem;
      })
  }

  add(item: SearchItem) {
    this.audioStream.fetch(item.snippet.title, item.id.videoId)
      .then(audioItem => {
        for (let i = 0; i < this.session.songs.length; i++) {
          if (this.session.songs[i].key == audioItem.key) {
            let insertItem = {
              key: audioItem.key,
              name: audioItem.name,
              index: i
            };
            console.log(insertItem);
            this.session.queue.push(insertItem);
          }
        }
      });
  }
}