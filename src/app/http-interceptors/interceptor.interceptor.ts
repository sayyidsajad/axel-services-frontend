import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private _router: Router) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const commonUrl: string = environment.APIURL
    const servicerToken = localStorage.getItem("servicerSecret")
    const adminToken = localStorage.getItem("adminSecret")
    const userToken = localStorage.getItem("userSecret")
    if (adminToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + adminToken),
        url: commonUrl + request.url
      })
      return next.handle(newRequest)
    } else if (servicerToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + servicerToken),
        url: commonUrl + request.url
      })
      return next.handle(newRequest)
    }
    else if (userToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + userToken),
        url: commonUrl + request.url
      })
      return next.handle(newRequest)
    }
    const newRequest = request.clone({
      url: commonUrl + request.url
    })
    return next.handle(newRequest)
  }
}
