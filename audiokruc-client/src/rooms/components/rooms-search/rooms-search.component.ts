import { Component, OnInit, HostBinding } from '@angular/core';
import { RoomInfo } from 'src/rooms/rooms.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ak-rooms-search',
  templateUrl: 'rooms-search.component.html',
  styleUrls: ['./rooms-search.component.css']
})
export class RoomsSearchComponent implements OnInit {

  @HostBinding('class.content-area')
  class_contentArea: boolean = true;

  rooms: RoomInfo[] = [];
  searchTerm: string = "";
  createRoomModal = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const query = `searchTerm=${this.searchTerm}`;
    this.http.get<RoomInfo[]>(`${environment.roomsServiceApi}/rooms?${query}`)
      .subscribe(rooms => this.rooms = rooms);
  }

  search() {
    this.getData();
  }
}
