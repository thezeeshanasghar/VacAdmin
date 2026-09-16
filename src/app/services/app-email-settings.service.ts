import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppEmailSettingsService extends BaseService {

  private readonly API_APP_EMAIL_SETTINGS = `${environment.BASE_URL}AppEmailSettings`

  constructor(
    protected http: HttpClient
  ) { super(http); }

  get(): Observable<any> {
    return this.http.get(this.API_APP_EMAIL_SETTINGS, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  save(data): Observable<any> {
    return this.http.put(this.API_APP_EMAIL_SETTINGS, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
