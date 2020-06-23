import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ak-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  @HostBinding('class.content-area')
  class_contentArea: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
