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

  async signIn() {
    const user = await this.session.GoogleApi.auth.signIn();
    console.log('Signed in user is ', user);
  }

  signOut() {
    this.session.GoogleApi.auth.signOut();
  }
}