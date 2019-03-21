import { NgModule } from '@angular/core';

function load() {
  gapi.load('client:auth2', onLoad);
}

async function onLoad() {
  await gapi.client.init({
    apiKey: 'AIzaSyD95v2xitNhzQEpzUkEbTqCixwrAc5DK_4',
    clientId: '694857033973-mv6hl7g7vm5vht8rn7ipm7553vk54ria.apps.googleusercontent.com',
    scope: ['https://www.googleapis.com/auth/youtube.readonly'].join(' ')
  });

  gapi.auth2.getAuthInstance().signIn().then((user) => console.log(user));
}

@NgModule(

)
export class GoogleApiWrapperModule {
  constructor() {
    load();
  }
}