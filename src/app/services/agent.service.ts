import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

export interface Agent {
  Id: number;
  Name: string;
  PhoneNumber: string;
  ReferralFeePerClient: number;
}
export interface AgentResponse {
  IsSuccess: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService extends BaseService {
  private readonly API_URL = `${environment.BASE_URL}Agent`;

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.API_URL).pipe(catchError(this.handleError));
  }

  getAgentById(id: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.API_URL}/${id}`).pipe(catchError(this.handleError));
  }

  addAgent(agent: any): Observable<any> {
    return this.http.post(this.API_URL, agent).pipe(catchError(this.handleError));
  }

  updateAgent(id: number, agent: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, agent).pipe(catchError(this.handleError));
  }

  deleteAgent(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<never> {
    throw error;
  }
}
