import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FetchService, SessionService } from './infrastructure.barrel';

@NgModule({
  providers: [
    FetchService,
    SessionService,
    HttpClientModule
  ]
})
export class InfrastructureModule { }