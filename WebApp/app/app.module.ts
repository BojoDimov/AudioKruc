import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { YoutubeModule } from './youtube/youtube-search.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    YoutubeModule
  ],
  declarations: [
    AppComponent,
    TestComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
