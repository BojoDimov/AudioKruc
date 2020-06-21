import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AudioPlayerComponent } from 'src/shared/components/audio-player/audio-player.component';

@Component({
  selector: 'ak-playlist-view',
  templateUrl: './playlist-view.component.html',
  styles: []
})
export class PlaylistViewComponent implements OnInit {
  @HostBinding('class.content-area')
  class_contentArea: boolean = true;

  @ViewChild(AudioPlayerComponent)
  audioPlayer: AudioPlayerComponent;

  playlist: any;
  audioPlayerSrc: string;

  constructor(
    private http: HttpClient,
    route: ActivatedRoute
  ) {
    route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.getData(params.get('id') || 0);
        this.audioPlayerSrc = `ws://${environment.playlistsService}/${params.get('id')}`;
      }
    });
  }

  ngOnInit(): void {

  }

  play() {
    this.audioPlayer.connect();
  }

  getData(playlistId: number | string) {
    this.http.get(`http://${environment.playlistsService}/playlists/${playlistId}`)
      .subscribe(playlist => this.playlist = playlist);
  }
}
