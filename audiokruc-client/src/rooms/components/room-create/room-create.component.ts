import { Component, OnInit } from '@angular/core';
import { RoomInfoCreateModel } from 'src/rooms/rooms.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { ModalBase } from 'src/infrastructure/modal.base';

@Component({
  selector: 'ak-room-create',
  templateUrl: './room-create.component.html',
  styles: []
})
export class RoomCreateComponent extends ModalBase {
  model: RoomInfoCreateModel = <RoomInfoCreateModel>{
    name: "",
    description: "",
    genre: ""
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    super();
  }

  save() {
    this.http.post<{ id: number }>(`${environment.roomsServiceApi}/rooms`, this.model)
      .subscribe(roomInfo => {
        this.modalOpened = false;
        this.router.navigate(['/rooms', roomInfo.id])
      });
  }
}
