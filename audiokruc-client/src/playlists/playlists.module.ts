import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsSearchComponent } from './components/playlists-search/playlists-search.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistSearchViewComponent } from './components/playlist-search-view/playlist-search-view.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'src/shared/shared.module';
import { YtSpotifyIntegrationComponent } from './components/yt-spotify-integration/yt-spotify-integration.component';
import { YtLogoComponent } from './components/yt-logo/yt-logo.component';
import { GoogleApiModule } from 'src/modules/google-api/google-api.module';
import { SongTileComponent } from './components/yt-spotify-integration/song-tile/song-tile.component';



@NgModule({
  declarations: [PlaylistsSearchComponent, PlaylistViewComponent, PlaylistSearchViewComponent, YtSpotifyIntegrationComponent, YtLogoComponent, SongTileComponent],
  imports: [
    CommonModule,
    ClarityModule,
    PlaylistsRoutingModule,
    SharedModule,
    GoogleApiModule
  ]
})
export class PlaylistsModule { }
