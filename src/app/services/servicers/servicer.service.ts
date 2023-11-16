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

  servicerRegister(companyName: string, email: string, phone: number, password: string, confirmPassword: string): Observable<any> {
    return this._http.post('servicer/signup', { companyName, email, phone, password, confirmPassword }, httpOptions)
  }
  servicerLogin(user: object): Observable<any> {
    return this._http.post('servicer', user, httpOptions)
  }
  servicerVerification(data: FormData, id: string): Observable<any> {
    return this._http.post(`servicer/servicerProcedures?id=${id}`, data)
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
  cancelBooking(bookingId: string, userId: string, status: string, textArea?: string,): Observable<any> {
    return this._http.post('servicer/cancelBooking', { bookingId, userId, status, textArea }, httpOptions)
  }
  getRecentUsers(): Observable<any> {
    return this._http.get('servicer/getRecentUsers', httpOptions)
  }
  getRecentChats(id: string): Observable<any> {
    return this._http.get(`servicer/getRecentChats?id=${id}`, httpOptions)
  }
  dashboardReports(): Observable<any> {
    return this._http.get('servicer/dashboardReports', httpOptions)
  }
}
