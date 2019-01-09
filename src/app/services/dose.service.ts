import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DoseService extends BaseService {

  private readonly API_DOSE = 'https://api.vaccs.io/api/dose'
  
  constructor(
    protected http: HttpClient
  ) { super(http); }

  
  getDoseById(doseId: String) : Observable<any> {
    const url = `${this.API_DOSE}/${doseId}`;
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
