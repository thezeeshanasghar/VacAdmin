import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccineInfoService extends BaseService {

  private readonly API_VACCINEINFO = `${environment.BASE_URL}vaccineinfo`

  constructor(
    protected http: HttpClient
  ) { super(http); }

  addVaccineInfo(data): Observable<any> {
    return this.http.post(this.API_VACCINEINFO, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  editVaccineInfo(id: string, data): Observable<any> {
    const url = `${this.API_VACCINEINFO}/${id}`;
    return this.http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteVaccineInfo(id: string): Observable<any> {
    const url = `${this.API_VACCINEINFO}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getVaccineInfos(): Observable<any> {
    return this.http.get(this.API_VACCINEINFO, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getVaccineInfoById(id: String): Observable<any> {
    const url = `${this.API_VACCINEINFO}/${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

}
