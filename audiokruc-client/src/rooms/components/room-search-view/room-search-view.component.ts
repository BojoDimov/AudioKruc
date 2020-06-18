import { Component, OnInit, Input } from '@angular/core';
import { RoomInfo } from 'src/rooms/rooms.models';

@Component({
  selector: 'ak-room-search-view',
  templateUrl: './room-search-view.component.html',
  styleUrls: ['./room-search-view.component.css']
})
export class RoomSearchViewComponent implements OnInit {
  @Input('room')
  room: RoomInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
