import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable()

export class ServicerService {
  constructor(private _http: HttpClient) { }
  servicerRegister(user: Object): Observable<any> {
    return this._http.post(`servicer/signup`, user, httpOptions)
  }
  servicerLogin(user: Object): Observable<any> {
    return this._http.post(`servicer`, user, httpOptions)
  }
  servicerVerification(user: any, id: string): Observable<any> {
    return this._http.post(`servicer/servicerProcedures?id=${id}`, user, httpOptions)
  }
  sendMail(id: string): Observable<any> {
    return this._http.get(`servicer/servicerOtpVerification?id=${id}`, httpOptions)
  }
  servicerDashboard(id: string): Observable<any> {
    return this._http.post('servicer/servicerDashboard', { id }, httpOptions)
  }
  categoriesList(): Observable<any> {
    return this._http.get('servicer/categoriesList', httpOptions)
  }
  logOut(): Observable<any> {
    return this._http.get('servicer/logout', httpOptions)
  }
  listBookings(): Observable<any> {
    return this._http.get('servicer/listBookings', httpOptions)
  }
  approve(id: string): Observable<any> {
    return this._http.post('servicer/approveBooking', { id }, httpOptions)
  }
  cancelBooking(textArea: string, bookingId: string, userId: string): Observable<any> {
    return this._http.post('servicer/cancelBooking', { textArea, bookingId, userId }, httpOptions)
  }
}
