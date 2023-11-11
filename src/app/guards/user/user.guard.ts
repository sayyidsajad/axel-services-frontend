import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export const UserGuardIn: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(environment.userSecret);
  const router = inject(Router)
  if (token) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};

export const UserGuardOut: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(environment.userSecret);
  const router = inject(Router)
  if (!token) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};

export const UserGuardConfig: CanActivateFn = (route, state) => {
  const adminToken = localStorage.getItem(environment.adminSecret)
  const servicerToken = localStorage.getItem(environment.servicerSecret)
  const router = inject(Router)
  if (adminToken) {
    router.navigate(['/admin'])
    return false
  } else if (servicerToken) {
    router.navigate(['/servicer'])
    return false
  } else {
    return true
  }
};

