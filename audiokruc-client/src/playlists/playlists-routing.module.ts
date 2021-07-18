import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsSearchComponent } from './components/playlists-search/playlists-search.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { YtSpotifyIntegrationComponent } from './components/yt-spotify-integration/yt-spotify-integration.component';

const routes: Routes = [
  {
    path: 'playlists',
    children: [
      {
        path: '',
        component: PlaylistsSearchComponent
      },
      {
        path: 'yt-spotify-integration',
        component: YtSpotifyIntegrationComponent
      },
      {
        path: ':id',
        component: PlaylistViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }