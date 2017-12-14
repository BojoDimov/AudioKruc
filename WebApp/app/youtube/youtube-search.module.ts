import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { YoutubeSearchComponent, YoutubeSearchResultComponent } from './youtube-search.barrel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    YoutubeSearchComponent,
    YoutubeSearchResultComponent
  ],
  exports: [
    YoutubeSearchComponent,
    YoutubeSearchResultComponent
  ]
})
export class YoutubeModule { }