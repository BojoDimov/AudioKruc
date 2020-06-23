import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { BarsVisualizerComponent } from './components/audio-player/visualizers/bars-visualizer/bars-visualizer.component';

@NgModule({
  declarations: [AudioPlayerComponent, BarsVisualizerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AudioPlayerComponent
  ]
})
export class SharedModule { }
