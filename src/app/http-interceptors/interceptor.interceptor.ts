import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { ErrorHandlingServiceService } from '../services/errorHandler/error-handling-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private _errorHandlerService: ErrorHandlingServiceService,private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    const commonUrl: string = environment.APIURL;
    const servicerToken = localStorage.getItem("servicerSecret");
    const adminToken = localStorage.getItem("adminSecret");
    const userToken = localStorage.getItem("userSecret");
    let newRequest = request;
    if (adminToken) {
      newRequest = newRequest.clone({
        headers: newRequest.headers.set('Authorization', 'Bearer ' + adminToken),
        url: commonUrl + newRequest.url
      });
    } else if (servicerToken) {
      newRequest = newRequest.clone({
        headers: newRequest.headers.set('Authorization', 'Bearer ' + servicerToken),
        url: commonUrl + newRequest.url
      });
    } else if (userToken) {
      newRequest = newRequest.clone({
        headers: newRequest.headers.set('Authorization', 'Bearer ' + userToken),
        url: commonUrl + newRequest.url
      });
    } else {
      newRequest = newRequest.clone({
        url: commonUrl + newRequest.url
      });
    }

    return next.handle(newRequest).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        this._errorHandlerService.handleError(error);
        return throwError(() => error);
      })
    );
  }
}
