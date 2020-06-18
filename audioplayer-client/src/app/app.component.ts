import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  transform$: Subject<any> = new Subject<any>();
  audioData$: Subject<any> = new Subject<any>();
}
