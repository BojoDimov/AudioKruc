import { Component } from '@angular/core';
import { GoogleApiService } from './gapi.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'AudioKruc';

  constructor(service: GoogleApiService) {
    console.log(service, service.auth.isSignedIn.get());
  }
}
