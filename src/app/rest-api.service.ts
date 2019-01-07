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
const apiApprovedDoctorURL = 'http://vac-api.afz-sol.com/api/doctor/approved'
const apiUnApprovedDoctorURL = 'http://vac-api.afz-sol.com/api/doctor/unapproved'
const apidoctordetailURL = 'http://vac-api.afz-sol.com/api/doctor/'
const apimsgURL = 'http://vac-api.afz-sol.com/api/message/?mobileNumber=&fromDate=&toDate='
const apimsgbyid = 'http://vac-api.afz-sol.com/api/message/?mobileNumber=&fromDate=&toDate='


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

  getApprovedDoctorList() : Observable<any> {
    return this.http.get(apiApprovedDoctorURL, httpOptions).pipe(
      map(this.extractData), 
      catchError(this.handleError)
    );
  }

  getUnApprovedDoctorList() : Observable<any> {
    return this.http.get(apiUnApprovedDoctorURL, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getDoctorById(id: String) : Observable<any> {
    const url = `${apidoctordetailURL}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  
  getMsg() : Observable<any> {
    return this.http.get(apimsgURL, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMessageById(id: String) : Observable<any> {
    const url = `${apimsgbyid}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
