import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'ak-test',
  templateUrl: './test.component.html'
})
export class TestComponent {
  private socket = null;

  constructor() {
    this.socket = io('http://localhost:12909');
  }
}
