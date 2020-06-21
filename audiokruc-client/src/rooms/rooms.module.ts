import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoomsSearchComponent } from './components/rooms-search/rooms-search.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { RoomViewComponent } from './components/room-view/room-view.component';
import { RoomSearchViewComponent } from './components/room-search-view/room-search-view.component';
import { SongAddComponent } from './components/song-add/song-add.component';
import { SharedModule } from 'src/shared/shared.module';
import { RoomCreateComponent } from './components/room-create/room-create.component';

@NgModule({
  declarations: [
    RoomsSearchComponent,
    RoomViewComponent,
    RoomCreateComponent,
    RoomSearchViewComponent,
    SongAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    SharedModule,
    RoomsRoutingModule
  ],
  providers: []
})
export class RoomsModule { }
