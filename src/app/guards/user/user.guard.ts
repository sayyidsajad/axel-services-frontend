import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(public router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('userSecret')
    if (token) {
      this.router.navigate(['/home'])
      return false
    } else {
      return true
    }
  }
}
@Injectable({
  providedIn: 'root'
})
export class UserGuardOut implements CanActivate {
  constructor(public router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('userSecret')
    if (!token) {
      this.router.navigate(['/'])
      return false
    } else {
      return true
    }
  }
}


