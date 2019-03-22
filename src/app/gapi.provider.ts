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
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
          scope: [
            'https://www.googleapis.com/auth/youtube.force-ssl',
            'https://www.googleapis.com/auth/youtubepartner'
          ].join(' ')
        });

        this.auth = gapi.auth2.getAuthInstance();
        resolve(true);
      });
    });
  }

  buildApiRequest(
    requestMethod: 'GET' | 'DELETE' | 'PUT' | 'POST',
    path: string,
    params: Object,
    properties?: Object
  ) {
    params = removeEmptyParams(params);

    if (properties)
      return gapi.client.request({
        'body': createResource(properties),
        'method': requestMethod,
        'path': path,
        'params': params
      }).then(res => JSON.parse(res.body));
    else
      return gapi.client.request({
        'method': requestMethod,
        'path': path,
        'params': params
      }).then(res => JSON.parse(res.body));
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

function createResource(properties) {
  var resource = {};
  var normalizedProps = properties;
  for (var p in properties) {
    var value = properties[p];
    if (p && p.substr(-2, 2) == '[]') {
      var adjustedName = p.replace('[]', '');
      if (value) {
        normalizedProps[adjustedName] = value.split(',');
      }
      delete normalizedProps[p];
    }
  }
  for (var p in normalizedProps) {
    // Leave properties that don't have values out of inserted resource.
    if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
      var propArray = p.split('.');
      var ref = resource;
      for (var pa = 0; pa < propArray.length; pa++) {
        var key = propArray[pa];
        if (pa == propArray.length - 1) {
          ref[key] = normalizedProps[p];
        } else {
          ref = ref[key] = ref[key] || {};
        }
      }
    };
  }
  return resource;
}

function removeEmptyParams(params) {
  for (var p in params) {
    if (!params[p] || params[p] == 'undefined') {
      delete params[p];
    }
  }
  return params;
}