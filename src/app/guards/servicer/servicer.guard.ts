import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export const ServicerGuardOut: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(environment.servicerSecret)
  const router = inject(Router)
  if (token) {
    router.navigate(['servicer/main/dashboard'])
    return false
  } else {
    return true
  }
};

export const ServicerGuardIn: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(environment.servicerSecret)
  const router = inject(Router)
  if (!token) {
    router.navigate(['/servicer'])
    return false
  } else {
    return true
  }
};

export const ServicerGuardConfig: CanActivateFn = (route, state) => {
  const adminToken = localStorage.getItem(environment.adminSecret)
  const userToken = localStorage.getItem(environment.userSecret)
  const router = inject(Router)
  if (adminToken) {
    router.navigate(['/admin'])
    return false
  } else if (userToken) {
    router.navigate(['/'])
    return false
  } else {
    return true
  }
};

