import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AudioPlayerComponent } from './audio.barrel';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AudioPlayerComponent
  ],
  exports: [
    AudioPlayerComponent
  ]
})
export class AudioModule { }