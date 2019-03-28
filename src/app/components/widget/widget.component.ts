import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styles: []
})
export class WidgetComponent implements OnInit {
  @Input()
  open = false;
  opening = false;

  constructor() { }

  ngOnInit() {
  }

  openWidget() {
    this.open = true;
    this.opening = true;
    setTimeout(() => this.opening = false, 5 * 1000);
  }

}
