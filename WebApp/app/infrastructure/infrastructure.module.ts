import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  FetchService,
  SocketFetchService,
  SessionService,
  PlayerService,
  AudioStreamService
} from './infrastructure.barrel';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: FetchService, useClass: SocketFetchService },
    AudioStreamService,
    SessionService,
    PlayerService
  ]
})
export class InfrastructureModule { }