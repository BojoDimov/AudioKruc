import { Injectable } from '@angular/core';
import { YoutubePlaylist, YoutubeResponse } from './models/youtube.models';

const SCOPES = {
  YOUTUBE_READONLY: "https://www.googleapis.com/auth/youtube.readonly"
};

const CREDENTIALS = {
  clientId: "462201115414-tr0v06okmt0ebn02bjluad2tf7sl3pm6.apps.googleusercontent.com",
  apiKey: "AIzaSyBLRAi1GogoJibrbsfBXexLj-UQMnGc0SE"
};

@Injectable()
export class GoogleApiService {
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      gapi.load("client:auth2", function () {
        gapi.auth2.init({ client_id: CREDENTIALS.clientId });
        gapi.client.setApiKey(CREDENTIALS.apiKey);
        gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest", "v3")
          .then(function () {
            console.log("GAPI client loaded for API");
            resolve();
          })
          .catch((err: any) => {
            console.error("Error loading GAPI client for API", err);
            reject(err);
          });
      });
    });
  }

  async authenticate() {
    await gapi.auth2.getAuthInstance()
      .signIn({
        scope: [
          SCOPES.YOUTUBE_READONLY
        ].join(' ')
      });
  }

  isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn;
  }

  getPlaylists(): Promise<YoutubeResponse<YoutubePlaylist>> {
    return (<any>gapi.client).youtube.playlists.list({
      "part": [
        "snippet"
      ],
      "maxResults": 25,
      "mine": true
    }).then((response: any) => {
      return response.result;
    })
  }
}
