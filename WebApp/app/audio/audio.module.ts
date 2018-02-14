import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AudioPlayerComponent, AudioQueueComponent, AudioVisualizerComponent } from './audio.barrel';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AudioPlayerComponent,
    AudioQueueComponent,
    AudioVisualizerComponent
  ],
  exports: [
    AudioPlayerComponent,
    AudioQueueComponent
  ]
})
export class AudioModule { }