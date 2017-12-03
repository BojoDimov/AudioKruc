import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { YoutubeSearchComponent } from './youtube-search.barrel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InfrastructureModule
  ],
  declarations: [
    YoutubeSearchComponent
  ],
  exports: [
    YoutubeSearchComponent
  ]
})
export class YoutubeModule { }