import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService {
  
  private readonly API_BRAND = 'https://api.vaccs.io/api/brand'

  constructor(
    protected http: HttpClient
  ) { super(http); }

  
  getBrandById(brandId: String) : Observable<any> {
    const url = `${this.API_BRAND}/${brandId}`;
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addBrand(vaccineId: string, data): Observable<any> {
    const url = `${this.API_BRAND}/${vaccineId}`;
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  EditBrand(id: string, data): Observable<any> {
    const url = `${this.API_BRAND}/${id}`;
    return this.http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  DeleteBrand(id: string): Observable<any> {
    const url = `${this.API_BRAND}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
