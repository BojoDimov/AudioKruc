import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { YoutubeSearchComponent } from './youtube-search.barrel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    YoutubeSearchComponent
  ],
  exports: [
    YoutubeSearchComponent
  ]
})
export class YoutubeModule { }