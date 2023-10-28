import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegister } from './types/user-types';
const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable()

export class UsersService {
  constructor(private _http: HttpClient) { }
  userRegister(name: string, email: string, phone: number, password: string, confirmPassword: string): Observable<any> {
    return this._http.post('signup', { name, email, phone, password, confirmPassword }, httpOptions)
  }
  userLogin(user: Object): Observable<any> {
    return this._http.post('', user, httpOptions)
  }
  servicerList(): Observable<any> {
    return this._http.get('servicerList', httpOptions)
  }
  sendMail(email: string): Observable<any> {
    return this._http.get(`otpVerification?email=${email}`, httpOptions)
  }
  loadHome(): Observable<any> {
    return this._http.get('home', httpOptions)
  }
  servicerDetails(id: string): Observable<any> {
    return this._http.get(`servicerDetails/?id=${id}`, httpOptions)
  }
  bookNow(id: string, date: Date, time: string, walletChecked?: number) {
    return this._http.post(`bookNow`, { id, date, time, walletChecked }, httpOptions)
  }
  logOut(): Observable<any> {
    return this._http.get('logout', httpOptions)
  }
  bookingsList(): Observable<any> {
    return this._http.get('bookingsList', httpOptions)
  }
  cancel(id: string, amount: string): Observable<any> {
    return this._http.patch('cancelBooked', { id, amount }, httpOptions)
  }
  userInbox(): Observable<any> {
    return this._http.get('userInbox', httpOptions)
  }
  clearAll(): Observable<any> {
    return this._http.get('clearAll', httpOptions)
  }
  verifyPayment(res: any, inserted: any): Observable<any> {
    return this._http.post('verifyPayment', { res, inserted }, httpOptions)
  }
  userProfile(): Observable<any> {
    return this._http.get('userProfile', httpOptions)
  }
  forgotPassword(email: string): Observable<any> {
    return this._http.post('forgotPassword', { email }, httpOptions)
  }
  verifyConfirmPassword(id:string,newPassword: string, newConfirmPassword: string): Observable<any> {
    return this._http.post(`verifyConfirmPassword?id=${id}`, { newPassword, newConfirmPassword }, httpOptions)
  }
}
