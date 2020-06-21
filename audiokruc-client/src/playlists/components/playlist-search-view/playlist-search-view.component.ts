import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ak-playlist-search-view',
  templateUrl: './playlist-search-view.component.html',
  styleUrls: ['./playlist-search-view.component.css']
})
export class PlaylistSearchViewComponent implements OnInit {
  @Input('playlist')
  playlist: any;

  constructor() { }

  ngOnInit(): void {
  }

}