import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchItem, YouTubeSearchResult } from "../youtube-search.barrel";



@Component({
  selector: 'ak-youtube-search',
  templateUrl: './youtube-search.component.html'
})

export class YoutubeSearchComponent {
  pattern: string = null;
  private url = 'https://www.googleapis.com/youtube/v3/search?';
  private key = 'AIzaSyDkRjFtuYxaQDimnmELKD-CVqg5GWzSKao';
  items: SearchItem[] = [];

  constructor(private http: HttpClient
  ) { }

  add(item: SearchItem) {
    console.log('Fetching auidio from backend');
  }

  search() {
    let query = this.url + 'part=snippet&type=video&q=' + this.pattern.split(' ').join('+') + '&key=' + this.key;
    this.http.get<YouTubeSearchResult>(query)
      .toPromise()
      .then(searchResult => this.items = searchResult.items)
      .catch(error => console.log('Encoutered an error: ', error));
  }
}

