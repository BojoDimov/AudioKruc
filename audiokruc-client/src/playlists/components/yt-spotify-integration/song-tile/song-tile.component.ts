import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ak-song-tile',
  templateUrl: './song-tile.component.html',
  styles: []
})
export class SongTileComponent implements OnInit {
  @Input() songData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
