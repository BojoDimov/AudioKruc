import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsSearchComponent } from './components/playlists-search/playlists-search.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistSearchViewComponent } from './components/playlist-search-view/playlist-search-view.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [PlaylistsSearchComponent, PlaylistViewComponent, PlaylistSearchViewComponent],
  imports: [
    CommonModule,
    ClarityModule,
    PlaylistsRoutingModule,
    SharedModule
  ]
})
export class PlaylistsModule { }
