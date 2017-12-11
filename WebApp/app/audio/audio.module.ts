import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule, MatSliderModule, MatIconModule } from '@angular/material';
import { AudioPlayerComponent } from './audio.barrel';

@NgModule({
  imports: [
    BrowserModule,
    MatProgressBarModule,
    MatSliderModule,
    MatIconModule
  ],
  declarations: [
    AudioPlayerComponent
  ],
  exports: [
    AudioPlayerComponent
  ]
})
export class AudioModule { }