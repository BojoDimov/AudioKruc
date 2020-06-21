import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ak-landing-page',
  templateUrl: './landing-page.component.html',
  styles: []
})
export class LandingPageComponent implements OnInit {

  @HostBinding('class.content-area')
  class_contentArea: boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log('Instantiating landing page')
  }

}
