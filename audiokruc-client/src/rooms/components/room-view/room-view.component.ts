import { Component, OnInit, HostBinding } from '@angular/core';
import { RoomViewModel, RoomInfo } from 'src/rooms/rooms.models';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ak-room-view',
  templateUrl: './room-view.component.html',
  styles: []
})
export class RoomViewComponent implements OnInit {
  @HostBinding('class.content-area')
  class_contentArea: boolean = true;

  roomId: number;
  room: RoomViewModel = <RoomViewModel>{};

  constructor(
    route: ActivatedRoute,
    private http: HttpClient
  ) {
    route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.roomId = parseInt(params.get('id') || "");
        this.getData();
      }
    });
  }

  ngOnInit(): void {
  }

  getData() {
    this.http.get<RoomViewModel>(`${environment.roomsServiceApi}/rooms/${this.roomId}`)
      .subscribe(room => this.room = room);
  }
}
