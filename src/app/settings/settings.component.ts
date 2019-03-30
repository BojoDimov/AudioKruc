import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent {
  isSignedIn = false;
  isDarkMode = false;

  constructor(
    public session: SessionService
  ) {
    this.isSignedIn = session.GoogleApi.auth.isSignedIn.get();
    session.GoogleApi.auth.isSignedIn.listen(signedIn => this.isSignedIn = signedIn);
  }

  async youtubeSign() {
    if (!this.session.GoogleApi.auth.isSignedIn.get())
      await this.session.GoogleApi.auth.signIn();
    else
      await this.session.GoogleApi.auth.signOut();
  }

  async spotifySign() {
    alert("Spotify login is not implemented!");
  }
}