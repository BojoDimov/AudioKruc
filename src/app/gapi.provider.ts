import { Injectable, APP_INITIALIZER } from '@angular/core';

@Injectable()
export class GoogleApiService {
  auth: gapi.auth2.GoogleAuth;

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      gapi.load('client:auth2', async () => {
        await gapi.client.init({
          apiKey: 'AIzaSyD95v2xitNhzQEpzUkEbTqCixwrAc5DK_4',
          clientId: '694857033973-mv6hl7g7vm5vht8rn7ipm7553vk54ria.apps.googleusercontent.com',
          scope: ['https://www.googleapis.com/auth/youtube.readonly'].join(' ')
        });

        this.auth = gapi.auth2.getAuthInstance();
        resolve(true);
      });
    });
  }
}

function GoogleApiLoadFactory(service: GoogleApiService) {
  return () => service.load();
}

export const GoogleApiProviders = [
  GoogleApiService,
  {
    provide: APP_INITIALIZER,
    useFactory: GoogleApiLoadFactory,
    deps: [GoogleApiService],
    multi: true
  }
];