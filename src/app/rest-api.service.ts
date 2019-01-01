import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap, map } from 'rxjs/operators'

const httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
};
const apiUrl = 'https://api.vaccs.io/api/vaccine'
const apiDoseUrl = 'https://api.vaccs.io/api/dose'

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occured', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getVaccines() : Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData), 
      catchError(this.handleError)
    );
  }

  getVaccineById(id: String) : Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getDoses(vaccineId: String) : Observable<any> {
    const url = `${apiUrl}/${vaccineId}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData), 
      catchError(this.handleError)
    );
  }

  getDoseById(id: String) : Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
