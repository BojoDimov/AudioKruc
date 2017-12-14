import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchItem, YouTubeSearchResult } from "../youtube-search.barrel";
import { AudioItem, FetchService, SessionService, PlayerService, AudioStreamService } from '../../infrastructure/infrastructure.barrel';

@Component({
  selector: 'ak-youtube-search',
  templateUrl: './youtube-search.component.html',
  encapsulation: ViewEncapsulation.None
})

export class YoutubeSearchComponent {
  pattern: string = null;
  private url = 'https://www.googleapis.com/youtube/v3/search?';
  private key = 'AIzaSyDkRjFtuYxaQDimnmELKD-CVqg5GWzSKao';// this is youtube api key
  items: SearchItem[] = [];

  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) { }

  search() {
    if (!this.pattern)
      return;
    let query = this.url + 'part=snippet&type=video&q=' + this.pattern.split(' ').join('+') + '&key=' + this.key;
    this.http.get<YouTubeSearchResult>(query)
      .toPromise()
      .then(searchResult => this.session.ytSearchItems = searchResult.items)
      .catch(error => console.log('Encoutered an error: ', error));
  }
}

