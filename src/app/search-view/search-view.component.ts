import { Component } from "@angular/core";
import { SessionService } from '../services/session.service';
import { YoutubeSearchResult } from '../models';

@Component({
  selector: 'search-view',
  templateUrl: './search-view.component.html'
})
export class SearchViewComponent {
  constructor(public session: SessionService) {
    session.SearchApi.searchResults.subscribe(e => this.searchResult = e);
  }

  searchResult: YoutubeSearchResult;
}