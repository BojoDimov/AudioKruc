import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AudioPlayerComponent, AudioQueueComponent } from './audio.barrel';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AudioPlayerComponent,
    AudioQueueComponent
  ],
  exports: [
    AudioPlayerComponent,
    AudioQueueComponent
  ]
})
export class AudioModule { }