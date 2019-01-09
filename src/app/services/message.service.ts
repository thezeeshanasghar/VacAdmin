import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService {

  private readonly API_MESSAGE = `${environment.BASE_URL}message`

  constructor(
    protected http: HttpClient
  ) { super(http); }


    
  getMsg() : Observable<any> {
    return this.http.get(this.API_MESSAGE +'/?mobileNumber=&fromDate=&toDate=', this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}