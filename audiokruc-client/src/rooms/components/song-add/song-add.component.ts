import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalBase } from 'src/infrastructure/modal.base';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'ak-song-add',
  templateUrl: './song-add.component.html',
  styles: []
})
export class SongAddComponent extends ModalBase {
  @Input('roomId')
  roomId: number;

  @Output('songAdded')
  onSongAdded: EventEmitter<never> = new EventEmitter<never>();

  url = "";
  loading: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  add() {
    this.loading = ClrLoadingState.LOADING;
    return this.http.post(`${environment.roomsServiceApi}/rooms/${this.roomId}/songs`, { url: this.url })
      .subscribe(_ => {
        this.loading = ClrLoadingState.SUCCESS;
        this.modalOpened = false;
        this.url = "";
        this.onSongAdded.emit();
      });
  }
}
