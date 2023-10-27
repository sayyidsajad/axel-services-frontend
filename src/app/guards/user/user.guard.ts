import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardIn implements CanActivate {

  constructor(public _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('userSecret');
    if (token) {
      this._router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserGuardOut implements CanActivate {
  constructor(public _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('userSecret');
    if (!token) {
      this._router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class UserGuardConfig implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const adminToken = localStorage.getItem('adminSecret')
    const servicerToken = localStorage.getItem('servicerSecret')

    if (adminToken) {
      this._router.navigate(['/admin'])
      return false
    } else if (servicerToken) {
      this._router.navigate(['/servicer'])
      return false
    } else {
      return true
    }
  }
}
