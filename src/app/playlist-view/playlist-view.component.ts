import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { YoutubePlaylist, Thumbnail } from '../youtube-playlists/youtube-playlists.component';

@Component({
  selector: 'playlist-view',
  templateUrl: './playlist-view.component.html',
  styles: []
})
export class PlaylistViewComponent implements OnInit {
  playlistItems: YoutubePlaylistItem[];
  playlist: YoutubePlaylist;

  constructor(
    public session: SessionService
  ) { }

  ngOnInit() {
    this.session.selectedPlaylist.subscribe(this.loadPlaylist.bind(this));
  }

  async loadPlaylist(playlist: YoutubePlaylist) {
    this.playlist = playlist;
    const result = await this.session.GoogleApi.buildApiRequest(
      'GET',
      '/youtube/v3/playlistItems',
      {
        'maxResults': '25',
        'part': 'snippet,contentDetails',
        'playlistId': playlist.id
      });
    this.playlistItems = result.items;
  }
}

export class YoutubePlaylistItem {
  id: string;
  snippet: {
    title: string,
    description: string,
    thumbnails: {
      default: Thumbnail
    },
    resourceId: {
      videoId: string,
    }
  };
}
