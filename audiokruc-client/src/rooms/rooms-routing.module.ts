import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { RoomsSearchComponent } from './components/rooms-search/rooms-search.component';
import { RoomViewComponent } from './components/room-view/room-view.component';

const routes: Routes = [
  {
    path: 'rooms',
    children: [
      {
        path: '',
        component: RoomsSearchComponent
      },
      {
        path: ':id',
        component: RoomViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }