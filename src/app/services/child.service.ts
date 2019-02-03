import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildService extends BaseService {

  private readonly API_CHILD = `${environment.BASE_URL}child`

  constructor(
    protected http: HttpClient
  ) { super(http); }

  searchChild(city: String) {

  }
  
}
