import { Injectable, EventEmitter } from "@angular/core";
import { FormControl } from '@angular/forms';
import { SessionService } from './session.service';
import { YoutubeSearchResult } from '../models';

@Injectable({ providedIn: 'root' })
export class SearchService {
  session: SessionService;
  formControl = new FormControl();
  searchTerm = this.formControl.valueChanges.pipe();
  searchResults = new EventEmitter<YoutubeSearchResult>();

  async search() {
    const options = {
      maxResults: 25,
      part: 'snippet',
      q: this.formControl.value,
      type: 'video'
    };
    const result = await this.session.GoogleApi.buildApiRequest<YoutubeSearchResult>('GET', '/youtube/v3/search', options);
    this.searchResults.emit(result);
  }
}