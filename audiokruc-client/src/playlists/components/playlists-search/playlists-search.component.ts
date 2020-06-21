import { Component, OnInit, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ak-playlists-search',
  templateUrl: './playlists-search.component.html'
})
export class PlaylistsSearchComponent implements OnInit {
  @HostBinding('class.content-area')
  class_contentArea: boolean = true;

  playlists: any[] = [];
  searchTerm: string = "";
  createPlaylistModal = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const query = `searchTerm=${this.searchTerm}`;
    console.log('Calling GET /playlists')
    this.http.get<any[]>(`http://${environment.playlistsService}/playlists?${query}`)
      .subscribe(playlists => this.playlists = playlists);
  }

  search() {
    this.getData();
  }
}
