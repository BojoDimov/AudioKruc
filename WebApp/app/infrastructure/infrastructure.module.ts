import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  FetchService,
  SessionService,
  PlayerService,
  AudioStreamService
} from './infrastructure.barrel';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    FetchService,
    SessionService,
    PlayerService,
    AudioStreamService
  ]
})
export class InfrastructureModule { }