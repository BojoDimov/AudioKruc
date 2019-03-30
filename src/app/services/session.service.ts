import { Injectable, EventEmitter } from "@angular/core";
import { GoogleApiService } from './gapi.provider';
import { SearchService } from './search.service';
import { YoutubePlaylist } from '../models';

@Injectable()
export class SessionService {
  selectedPlaylist: EventEmitter<YoutubePlaylist> = new EventEmitter();

  constructor(
    public GoogleApi: GoogleApiService,
    public SearchApi: SearchService
  ) {
    this.SearchApi.session = this;
  }
}