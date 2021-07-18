import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { BarsVisualizerComponent } from './components/audio-player/visualizers/bars-visualizer/bars-visualizer.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [AudioPlayerComponent, BarsVisualizerComponent],
  imports: [
    CommonModule,
    ClarityModule
  ],
  exports: [
    AudioPlayerComponent
  ]
})
export class SharedModule { }
