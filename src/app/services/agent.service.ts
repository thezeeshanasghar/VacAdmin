import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

export interface City {
  id: number;
  name: string;
}
export interface CityResponse {
  IsSuccess: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService extends BaseService {
  private readonly API_URL = `${environment.BASE_URL}Agent`;
  private readonly API_URL2 = `${environment.BASE_URL}Agent/AgentAlert`;
  private readonly API_URL3 = `${environment.BASE_URL}Agent/update`;

  constructor(protected http: HttpClient) { 
    super(http);
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.API_URL).pipe(catchError(this.handleError));
  }

  getAlertCities(): Observable<City[]> {
    return this.http.get<City[]>(this.API_URL2).pipe(catchError(this.handleError));
  }
  addCity(city): Observable<any> {
    return this.http.post(this.API_URL, city).pipe(catchError(this.handleError));
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(catchError(this.handleError));
  }

  // updateChildCity(currentCity: string, newCity: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put(`${this.API_URL3}?currentCity=${currentCity}`, `"${newCity}"`, { headers });
  //   // return this.http.put(`${this.API_URL3}?currentCity=${currentCity}`, `"${newCity}"`).pipe(catchError(this.handleError));
  // }
  updateChildCity(newCity: string): Observable<CityResponse> {
    return this.http.put<CityResponse>(
      `${this.API_URL3}`,
      JSON.stringify(newCity),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  protected handleError(error: any): Observable<never> {
    // handle error
    throw error;
  }
}

