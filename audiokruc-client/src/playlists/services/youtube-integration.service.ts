import { Injectable } from "@angular/core";

interface AuthenticationService {
  login(): void;
  logout(): void;
}

interface PlaylistIntegrationService {
  getSongs(searchTerm: string, options: any): any[];
  getPlaylists(): any[];
  getPlaylistSongs(playlistId: string): any[];
  createPlaylist(model: any): void;
  updatePlaylist(playlistId: string, model: any): void;
  deletePlaylist(playlistId: string): void;
}

@Injectable()
export class YoutubeIntegrationService implements PlaylistIntegrationService {
  getSongs(searchTerm: string, options: any): any[] {
    throw new Error('Method not implemented.');
  }
  getPlaylists(): any[] {
    throw new Error('Method not implemented.');
  }
  getPlaylistSongs(playlistId: string): any[] {
    throw new Error('Method not implemented.');
  }
  createPlaylist(model: any): void {
    throw new Error('Method not implemented.');
  }
  updatePlaylist(playlistId: string, model: any): void {
    throw new Error('Method not implemented.');
  }
  deletePlaylist(playlistId: string): void {
    throw new Error('Method not implemented.');
  }

}