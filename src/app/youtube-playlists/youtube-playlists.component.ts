import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'youtube-playlists',
  templateUrl: './youtube-playlists.component.html',
  styles: []
})
export class YoutubePlaylistsComponent {
  playlists: YoutubePlaylist[];

  constructor(
    public session: SessionService
  ) {
    session.GoogleApi.auth.currentUser.listen(this.handleAuthorized.bind(this));
    this.handleAuthorized(session.GoogleApi.auth.currentUser.get());
  }

  handleAuthorized(user: gapi.auth2.GoogleUser) {
    if (user && this.checkScopes(user))
      this.loadPlaylists();
    else
      console.log('User has not granted scopes');
  }

  checkScopes(user: gapi.auth2.GoogleUser) {
    return user.hasGrantedScopes([
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtubepartner'
    ].join(' '));
  }

  async loadPlaylists() {
    const result = await this.session.GoogleApi.buildApiRequest(
      'GET',
      '/youtube/v3/playlists',
      {
        'mine': 'true',
        'maxResults': '25',
        'part': 'snippet,contentDetails'
      });
    this.playlists = result.items;
  }
}

class YoutubePlaylist {
  snippet: {
    title: string,
    description: string,
    publishedAt: Date,
    thumbnails: {
      default: Thumbnail
    }
  };
  contentDetails: {
    itemCount: number
  }
}

class Thumbnail {
  url: string
  width: number
  height: number
}
