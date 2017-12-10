import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule, MatSliderModule } from '@angular/material';
import { AudioPlayerComponent } from './audio.barrel';

@NgModule({
  imports: [BrowserModule,
    MatProgressBarModule,
    MatSliderModule
  ],
  declarations: [
    AudioPlayerComponent
  ],
  exports: [
    AudioPlayerComponent
  ]
})
export class AudioModule { }