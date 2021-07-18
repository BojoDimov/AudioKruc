import { APP_INITIALIZER, NgModule } from "@angular/core";
import { GoogleApiService } from './google-api.service';

function GoogleApiLoadFactory(service: GoogleApiService) {
  return async () => await service.load();
}

@NgModule({
  providers: [
    GoogleApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: GoogleApiLoadFactory,
      deps: [GoogleApiService],
      multi: true
    }
  ]
})
export class GoogleApiModule { }