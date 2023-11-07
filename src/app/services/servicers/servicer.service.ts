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
  servicerLogin(user: Object): Observable<any> {
    return this._http.post('servicer', user, httpOptions)
  }
  servicerVerification(serviceName: string, description: string, amount: number, category: string, file: string, id: string): Observable<any> {
    return this._http.post(`servicer/servicerProcedures?id=${id}`, { serviceName, description, amount, category, file }, httpOptions)
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
