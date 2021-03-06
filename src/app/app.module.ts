import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { GoogleApiProviders } from './services/gapi.provider';

import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { YoutubePlaylistsComponent } from './youtube-playlists/youtube-playlists.component';
import { SettingsComponent } from './settings/settings.component';
import { SessionService } from './services/session.service';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { SearchViewComponent } from './search-view/search-view.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubePlaylistsComponent,
    SettingsComponent,
    PlaylistViewComponent,
    SearchViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ComponentsModule
  ],
  providers: [
    SessionService,
    ...GoogleApiProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(far, fas, fab);
  }
}
