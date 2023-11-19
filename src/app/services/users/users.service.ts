import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  userLogin(user: object): Observable<any> {
    return this._http.post('', user, httpOptions)
  }
  userGoogleLogin(socialUser: SocialUser): Observable<any> {
    return this._http.post('googleLogin', socialUser, httpOptions)
  }
  servicerList(): Observable<any> {
    return this._http.get('servicerList', httpOptions)
  }
  sendMail(email: string): Observable<any> {
    return this._http.get(`otpVerification?email=${email}`, httpOptions)
  }
  loadHome(email: string): Observable<any> {
    return this._http.patch('home', { email }, httpOptions)
  }
  servicerDetails(id: string): Observable<any> {
    return this._http.get(`servicerDetails?id=${id}`, httpOptions)
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
  verifyPayment(res: object, inserted: object): Observable<any> {
    return this._http.post('verifyPayment', { res, inserted }, httpOptions)
  }
  userProfile(): Observable<any> {
    return this._http.get('userProfile', httpOptions)
  }
  forgotPassword(email: string): Observable<any> {
    return this._http.post('forgotPassword', { email }, httpOptions)
  }
  verifyConfirmPassword(id: string, newPassword: string, newConfirmPassword: string): Observable<any> {
    return this._http.post(`verifyConfirmPassword?id=${id}`, { newPassword, newConfirmPassword }, httpOptions)
  }
  getRecentChats(id: string): Observable<any> {
    return this._http.get(`getRecentChats?id=${id}`, httpOptions)
  }
  userEnquiry(firstName: string, lastName: string, email: string, message: string): Observable<any> {
    return this._http.post('userEnquiry', { firstName, lastName, email, message }, httpOptions)
  }
  review(servicerId: string, userId: string, message: string): Observable<any> {
    return this._http.post('review', { servicerId, userId, message }, httpOptions)
  }
  reviewsList(servicerId: string): Observable<any> {
    return this._http.get(`reviewsList?id=${servicerId}`, httpOptions)
  }
}
