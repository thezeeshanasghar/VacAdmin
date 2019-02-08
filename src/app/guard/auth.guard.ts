import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private api: LoginService,
    private route: Router
  ) {
  }
  canActivate(): boolean {
    if(this.api.isAuthenticated())
    return true;
    else {
      this.route.navigate(['login']);
      return false;
    }
  }
}
