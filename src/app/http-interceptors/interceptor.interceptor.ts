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
  constructor(private router: Router) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let commonUrl: string = environment.APIURL
    let servicerToken = localStorage.getItem("servicerSecret")    
    let adminToken = localStorage.getItem("adminSecret")
    let userToken = localStorage.getItem("userSecret")
    if (adminToken) {
      let newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + adminToken),
        url: commonUrl + request.url
      })
      return next.handle(newRequest)
    } else if (servicerToken) {
      let newRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + servicerToken },
        url: commonUrl + request.url
      })
      return next.handle(newRequest)
    }
    else if (userToken) {
      let newRequest = request.clone({
        setHeaders: { Authorization: 'Bearer ' + userToken },
        url: commonUrl + request.url
      })
      return next.handle(newRequest)
    }
    let newRequest = request.clone({
      url: commonUrl + request.url
    })
    return next.handle(newRequest)
  }
}
