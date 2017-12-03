import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchItem, YouTubeSearchResult } from "../youtube-search.barrel";
import { AudioItem, FetchService, SessionService } from '../../infrastructure/infrastructure.barrel';

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
    private session: SessionService
  ) { }

  add(item: SearchItem) {
    console.log('Fetching auidio from backend');
    this.fetchService.fetch(item.id.videoId)
      .then(res => this.session.addSong({
        name: item.snippet.title,
        buffer: res,
        key: item.id.videoId
      }));
  }

  search() {
    let query = this.url + 'part=snippet&type=video&q=' + this.pattern.split(' ').join('+') + '&key=' + this.key;
    this.http.get<YouTubeSearchResult>(query)
      .toPromise()
      .then(searchResult => this.items = searchResult.items)
      .catch(error => console.log('Encoutered an error: ', error));
  }
}

