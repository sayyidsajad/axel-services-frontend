import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServicerGuardOut implements CanActivate {

  constructor(public _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('servicerSecret')
    if (token) {
      this._router.navigate(['servicer/main/dashboard'])
      return false
    } else {
      return true
    }
  }

}

@Injectable({
  providedIn: 'root'
})

export class ServicerGuardIn {
  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('servicerSecret')
    if (!token) {
      this._router.navigate(['/servicer'])
      return false
    } else {
      return true
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class ServicerGuardConfig implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const adminToken = localStorage.getItem('adminSecret')
    const userToken = localStorage.getItem('userSecret')

    if (adminToken) {
      this._router.navigate(['/admin'])
      return false
    } else if (userToken) {
      this._router.navigate(['/'])
      return false
    } else {
      return true
    }
  }
}
