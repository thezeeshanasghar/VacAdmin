import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService {
  
  private readonly API_BRAND = `${environment.BASE_URL}brand`

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
}
