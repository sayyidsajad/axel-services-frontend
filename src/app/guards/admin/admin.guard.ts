import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export const AdminGuardOut: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(environment.adminSecret)
  const router = inject(Router)
  if (token) {
    router.navigate(['/admin/main/dashboard'])
    return false
  } else {
    return true
  }
};

export const AdminGuardIn: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(environment.adminSecret)
  const router = inject(Router)
  if (!token) {
    router.navigate(['/admin'])
    return false
  } else {
    return true
  }
};

export const AdminGuardConfig: CanActivateFn = (route, state) => {
  const servicerToken = localStorage.getItem(environment.servicerSecret)
  const userToken = localStorage.getItem(environment.userSecret)
  const router = inject(Router)
  if (servicerToken) {
    router.navigate(['/servicer'])
    return false
  } else if (userToken) {
    router.navigate(['/'])
    return false
  } else {
    return true
  }
};

