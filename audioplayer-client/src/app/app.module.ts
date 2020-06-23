import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CircleComponent } from './circle/circle.component';
import { EditorComponent } from './editor/editor.component';
import { PlayerComponent } from './player/player.component';
import { BarsComponent } from './bars/bars.component';

@NgModule({
  declarations: [
    AppComponent,
    CircleComponent,
    EditorComponent,
    PlayerComponent,
    BarsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
