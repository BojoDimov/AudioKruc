import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { YoutubeModule } from './youtube/youtube-search.module';
import { AudioModule } from './audio/audio.module';
import { AudioStreamService, FetchService, PlayerService, SessionService } from './infrastructure/infrastructure.barrel';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    YoutubeModule,
    AudioModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AudioStreamService,
    FetchService,
    PlayerService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
