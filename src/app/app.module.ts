import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faMoon, faPowerOff, faSun } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { GoogleApiProviders } from './gapi.provider';

import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { YoutubePlaylistsComponent } from './youtube-playlists/youtube-playlists.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubePlaylistsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ComponentsModule
  ],
  providers: [
    ...GoogleApiProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(far, fas, faCoffee, faMoon, faPowerOff, faSun);
  }
}
