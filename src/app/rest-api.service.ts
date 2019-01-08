import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap, map } from 'rxjs/operators'


const httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
};
const apiVaccineURL = 'https://api.vaccs.io/api/vaccine'
const apiDoseURL = 'https://api.vaccs.io/api/dose'
const apiBrandURL = 'https://api.vaccs.io/api/brand'
const apiDoctorURL = 'https://api.vaccs.io/api/doctor'
const apimsgURL = 'http://vac-api.afz-sol.com/api/message'


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  myHeaders: Headers = new Headers;
  constructor(
    private http: HttpClient,
    ) { }

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
    return this.http.get(apiVaccineURL, httpOptions).pipe(
      map(this.extractData), 
      catchError(this.handleError)
    );
  }

  getVaccineById(id: String) : Observable<any> {
    const url = `${apiVaccineURL}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getDoses(vaccineId: String) : Observable<any> {
    const url = `${apiVaccineURL}/${vaccineId}/dosses`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData), 
      catchError(this.handleError)
    );
  }

  getDoseById(doseId: String) : Observable<any> {
    const url = `${apiDoseURL}/${doseId}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getBrands(vaccineId: String) : Observable<any> {
    const url = `${apiVaccineURL}/${vaccineId}/brands`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData), 
      catchError(this.handleError)
    );
  }

  getBrandById(brandId: String) : Observable<any> {
    const url = `${apiBrandURL}/${brandId}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getApprovedDoctors() : Observable<any> {
    return this.http.get(apiDoctorURL + "/approved", httpOptions).pipe(
      map(this.extractData), 
      catchError(this.handleError)
    );
  }

  getUnApprovedDoctors() : Observable<any> {
    return this.http.get(apiDoctorURL+"/unapproved", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getDoctorById(id: String) : Observable<any> {
    const url = `${apiDoctorURL}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  
  getMsg() : Observable<any> {
    return this.http.get(apimsgURL +'/?mobileNumber=&fromDate=&toDate=', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateDoctorPermission(id: string, data): Observable<any> {
    const url = `${apiDoctorURL}/${id}/update-permission`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
