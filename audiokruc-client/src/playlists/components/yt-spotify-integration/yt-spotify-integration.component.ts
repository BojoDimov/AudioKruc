import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from 'src/modules/google-api/google-api.service';
import { YoutubePlaylist } from 'src/modules/google-api/models/youtube.models';

@Component({
  selector: 'ak-yt-spotify-integration',
  templateUrl: './yt-spotify-integration.component.html',
  styleUrls: ['./yt-spotify-integration.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('1s ease-in-out', keyframes([
            style({ opacity: 0 }),
            style({ opacity: 0.5 }),
            style({ opacity: 1 })
          ]))
        ]))
      ])
    ])
  ]
})
export class YtSpotifyIntegrationComponent implements OnInit {

  isLoggedInYt: boolean = false;
  playlists: YoutubePlaylist[] = [];

  constructor(
    private googleApi: GoogleApiService
  ) { }

  ngOnInit(): void {
  }

  async loginYt() {
    await this.googleApi.authenticate();
  }

  logoutYt() {
    // let user = await this.googleApi.auth.isSignedIn
  }

  async getPlaylistsYt() {
    let response = await this.googleApi.getPlaylists();
    console.log(response);
    this.playlists = response.items;
  }
}
