import { Component } from '@angular/core';
import { GoogleApiService } from './services/gapi.provider';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'AudioKruc';

  constructor(public session: SessionService) { }
}
