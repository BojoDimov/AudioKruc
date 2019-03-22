import { Injectable } from "@angular/core";
import { GoogleApiService } from './gapi.provider';

@Injectable()
export class SessionService {
  constructor(
    public GoogleApi: GoogleApiService
  ) { }
}