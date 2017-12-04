import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  FetchService,
  SessionService,
  PlayerService
} from './infrastructure.barrel';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    FetchService,
    SessionService,
    PlayerService
  ]
})
export class InfrastructureModule { }