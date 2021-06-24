import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Source } from '../models/source';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  API_URL = 'https://notify-articles.herokuapp.com/api/v1/';
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    }),
  };
  constructor(private http: HttpClient) {}

  getSources(): Observable<Source[]> {
    return this.http
      .get<Source[]>(this.API_URL + 'sources', this.httpOptions)
      .pipe(
        shareReplay(1),
        tap(() => {})
      );
  }
}
