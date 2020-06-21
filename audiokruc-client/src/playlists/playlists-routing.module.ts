import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsSearchComponent } from './components/playlists-search/playlists-search.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';

const routes: Routes = [
  {
    path: 'playlists',
    children: [
      {
        path: '',
        component: PlaylistsSearchComponent
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