import { Injectable, EventEmitter } from "@angular/core";
import { GoogleApiService } from './gapi.provider';
import { YoutubePlaylist } from './youtube-playlists/youtube-playlists.component';

@Injectable()
export class SessionService {
  selectedPlaylist: EventEmitter<YoutubePlaylist> = new EventEmitter();

  constructor(
    public GoogleApi: GoogleApiService
  ) { }
}