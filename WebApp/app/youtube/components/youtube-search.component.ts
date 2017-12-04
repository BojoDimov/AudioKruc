import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchItem, YouTubeSearchResult } from "../youtube-search.barrel";
import { AudioItem, FetchService, SessionService, PlayerService } from '../../infrastructure/infrastructure.barrel';

@Component({
  selector: 'ak-youtube-search',
  templateUrl: './youtube-search.component.html'
})

export class YoutubeSearchComponent {
  pattern: string = null;
  private url = 'https://www.googleapis.com/youtube/v3/search?';
  private key = 'AIzaSyDkRjFtuYxaQDimnmELKD-CVqg5GWzSKao';
  items: SearchItem[] = [];

  constructor(
    private http: HttpClient,
    private fetchService: FetchService,
    private session: SessionService,
    private player: PlayerService
  ) { }

  add(item: SearchItem) {
    this.fetchService.fetch(item.id.videoId)
      .then(rawBuffer => this.player.decode(rawBuffer))
      .then(audioBuffer => this.session.addSong({
        name: item.snippet.title,
        buffer: audioBuffer,
        key: item.id.videoId
      }))
      .then(song => this.player.play(song));
  }

  search() {
    let query = this.url + 'part=snippet&type=video&q=' + this.pattern.split(' ').join('+') + '&key=' + this.key;
    this.http.get<YouTubeSearchResult>(query)
      .toPromise()
      .then(searchResult => this.items = searchResult.items)
      .catch(error => console.log('Encoutered an error: ', error));
  }
}

