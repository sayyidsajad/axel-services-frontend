import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookNowResponse, IBookingsListResponse, IGoogleLoginResponse, ILoginResponse, IOtpVerificationResponse, IServicerDetailsResponse, IServicerListResponse, ISignUpResponse, IUserInboxResponse, IVerifyPaymentResponse, IUserProfileResponse, IGetRecentChatsResponse, IReview } from './types/user-types';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};
@Injectable()

export class UsersService {
  constructor(private _http: HttpClient) { }

  userRegister(name: string, email: string, phone: number, password: string, confirmPassword: string): Observable<ISignUpResponse> {
    return this._http.post<ISignUpResponse>('signup', { name, email, phone, password, confirmPassword }, httpOptions)
  }
  userLogin(user: object): Observable<ILoginResponse> {
    return this._http.post<ILoginResponse>('', user, httpOptions)
  }
  userGoogleLogin(socialUser: SocialUser): Observable<IGoogleLoginResponse> {
    return this._http.post<IGoogleLoginResponse>('googleLogin', socialUser, httpOptions)
  }
  servicerList(page?: number): Observable<IServicerListResponse> {
    let params = new HttpParams()
    if (page) params = params.append('page', page)
    return this._http.get<IServicerListResponse>('servicerList', { params })
  }
  sendMail(email: string): Observable<IOtpVerificationResponse> {
    return this._http.get<IOtpVerificationResponse>(`otpVerification?email=${email}`, httpOptions)
  }
  loadHome(email: string): Observable<void> {
    return this._http.patch<void>('home', { email }, httpOptions)
  }
  servicerDetails(id: string): Observable<IServicerDetailsResponse> {
    return this._http.get<IServicerDetailsResponse>(`servicerDetails?id=${id}`, httpOptions)
  }
  bookNow(id: string, date: string, time: string, walletChecked?: number): Observable<IBookNowResponse> {
    return this._http.post<IBookNowResponse>(`bookNow`, { id, date, time, walletChecked }, httpOptions)
  }
  bookingsList(): Observable<IBookingsListResponse> {
    return this._http.get<IBookingsListResponse>('bookingsList', httpOptions)
  }
  cancel(id: string, amount: string): Observable<void> {
    return this._http.patch<void>('cancelBooked', { id, amount }, httpOptions)
  }
  userInbox(): Observable<IUserInboxResponse> {
    return this._http.get<IUserInboxResponse>('userInbox', httpOptions)
  }
  clearAll(): Observable<void> {
    return this._http.get<void>('clearAll', httpOptions)
  }
  verifyPayment(res: object, inserted: object): Observable<IVerifyPaymentResponse> {
    return this._http.post<IVerifyPaymentResponse>('verifyPayment', { res, inserted }, httpOptions)
  }
  userProfile(): Observable<IUserProfileResponse> {
    return this._http.get<IUserProfileResponse>('userProfile', httpOptions)
  }
  forgotPassword(email: string): Observable<void> {
    return this._http.post<void>('forgotPassword', { email }, httpOptions)
  }
  verifyConfirmPassword(id: string, newPassword: string, newConfirmPassword: string): Observable<void> {
    return this._http.post<void>(`verifyConfirmPassword?id=${id}`, { newPassword, newConfirmPassword }, httpOptions)
  }
  getRecentChats(id: string): Observable<any> {
    return this._http.get<any>(`getRecentChats?id=${id}`, httpOptions)
  }
  userEnquiry(firstName: string, lastName: string, email: string, message: string): Observable<void> {
    return this._http.post<void>('userEnquiry', { firstName, lastName, email, message }, httpOptions)
  }
  review(servicerId: string, userId: string, message: string): Observable<void> {
    return this._http.post<void>('review', { servicerId, userId, message }, httpOptions)
  }
  reviewsList(servicerId: string): Observable<any> {
    return this._http.get<any>(`reviewsList?id=${servicerId}`, httpOptions)
  }
  listBanners(): Observable<any> {
    return this._http.get<any>('listBanners', httpOptions)
  }
  additionalServices(id: string): Observable<any> {
    return this._http.get(`additionalList?id=${id}`, httpOptions)
  }
  profilePicture(data: FormData): Observable<any> {
    return this._http.patch('profilePicture', data)
  }
  filterDates(id: string): Observable<any> {
    return this._http.get(`filterDates?id=${id}`, httpOptions)
  }
  filterTimes(id: string, date: string): Observable<any> {
    return this._http.post('filterTimes', { id, date }, httpOptions)
  }
  categoriesList(): Observable<any> {
    return this._http.get('categoriesList', httpOptions)
  }
  findService(place?: string, categ?: string, date?: string): Observable<any> {
    return this._http.post('findSearched', { place, categ, date }, httpOptions)
  }
}
