import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicerGuard implements CanActivate {
  constructor(public router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('servicerSecret')
    if (token) {
      this.router.navigate(['/servicer/servicerDashboard'])
      return false
    } else {
      return true
    }
  }
}


