import { Injectable, ReflectiveInjector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class FetchService {
  private backend = 'http://localhost:12909/?viewKey=';

  constructor(
    private http: HttpClient
  ) { }

  fetch(url: string): Promise<ArrayBuffer> {
    return this.http.get(this.backend + url, {
      responseType: 'arraybuffer',
      params: new HttpParams().set('useAuth', 'true')
    }).toPromise();
  }
}

// cannot resolve HttpClient
const injector = ReflectiveInjector.resolveAndCreate([HttpClient]);
export const fetch = (url: string) => {
  return injector.get(HttpClient).get(this.backend + url, {
    responseType: 'arraybuffer',
    params: new HttpParams().set('useAuth', 'true')
  }).toPromise();
}