import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { PersistanceService } from './persistance.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUsersGuard implements CanActivate {

  constructor(private localStorage:LoginService, private _router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.localStorage.getJwtToken()) {
      return true
    }else {
      this._router.navigate([""]);
      return false
    }
  }
}
