import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styles: []
})
export class WidgetComponent implements OnInit {
  @Input()
  open = true;

  constructor() { }

  ngOnInit() {
  }

}
