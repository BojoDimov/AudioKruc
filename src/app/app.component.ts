import { Component } from '@angular/core';
import { GoogleApiService } from './gapi.provider';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'AudioKruc';

  constructor(public session: SessionService) { }
}
