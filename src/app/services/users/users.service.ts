import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookNowResponse, IBookingsListResponse, IGoogleLoginResponse, ILoginResponse, IOtpVerificationResponse, IServicerDetailsResponse, IServicerListResponse, ISignUpResponse, IUserInboxResponse, IVerifyPaymentResponse, IUserProfileResponse } from './types/user-types';

@Injectable()
export class UsersService {
  constructor(private _http: HttpClient) { }
  userRegister(name: string, email: string, phone: number, password: string, confirmPassword: string): Observable<ISignUpResponse> {
    return this._http.post<ISignUpResponse>('signup', { name, email, phone, password, confirmPassword })
  }
  userLogin(user: object): Observable<ILoginResponse> {
    return this._http.post<ILoginResponse>('', user)
  }
  userGoogleLogin(socialUser: SocialUser): Observable<IGoogleLoginResponse> {
    return this._http.post<IGoogleLoginResponse>('googleLogin', socialUser)
  }
  servicerList(page?: number, filters?: any): Observable<IServicerListResponse> {
    let params = new HttpParams()
    if (page) params = params.append('page', page)
    if (filters) {
      if (filters.category) params = params.append('category', filters.category)
      if (filters.company) params = params.append('company', filters.company)
      if (filters.price) params = params.append('price', filters.price)
    }
    return this._http.get<IServicerListResponse>('servicerList', { params })
  }
  sendMail(id: string): Observable<IOtpVerificationResponse> {
    return this._http.get<IOtpVerificationResponse>(`otpVerification?id=${id}`)
  }
  loadHome(id: string): Observable<void> {
    return this._http.patch<void>('home', { id })
  }
  servicerDetails(id: string): Observable<IServicerDetailsResponse> {
    return this._http.get<IServicerDetailsResponse>(`servicerDetails?id=${id}`)
  }
  bookNow(id: string, date: string, time: string, place: string, walletChecked?: number): Observable<IBookNowResponse> {
    return this._http.post<IBookNowResponse>(`bookNow`, { id, date, time, place, walletChecked })
  }
  bookingsList(): Observable<IBookingsListResponse> {
    return this._http.get<IBookingsListResponse>('bookingsList')
  }
  cancel(id: string, textArea?: string): Observable<void> {
    return this._http.patch<void>('cancelBooked', { id, textArea })
  }
  userInbox(): Observable<IUserInboxResponse> {
    return this._http.get<IUserInboxResponse>('userInbox')
  }
  clearAll(): Observable<void> {
    return this._http.get<void>('clearAll')
  }
  verifyPayment(res: object, inserted: object): Observable<IVerifyPaymentResponse> {
    return this._http.post<IVerifyPaymentResponse>('verifyPayment', { res, inserted })
  }
  userProfile(): Observable<IUserProfileResponse> {
    return this._http.get<IUserProfileResponse>('userProfile')
  }
  forgotPassword(email: string): Observable<void> {
    return this._http.post<void>('forgotPassword', email)
  }
  verifyConfirmPassword(id: string, newPassword: string, newConfirmPassword: string): Observable<void> {
    return this._http.post<void>(`verifyConfirmPassword?id=${id}`, { newPassword, newConfirmPassword })
  }
  getRecentChats(id: string): Observable<any> {
    return this._http.get<any>(`getRecentChats?id=${id}`)
  }
  userEnquiry(firstName: string, lastName: string, email: string, message: string): Observable<void> {
    return this._http.post<void>('userEnquiry', { firstName, lastName, email, message })
  }
  review(servicerId: string, userId: string, message: string): Observable<void> {
    return this._http.post<void>('review', { servicerId, userId, message })
  }
  reviewsList(servicerId: string): Observable<any> {
    return this._http.get<any>(`reviewsList?id=${servicerId}`)
  }
  listBanners(): Observable<any> {
    return this._http.get<any>('listBanners')
  }
  additionalServices(id: string): Observable<any> {
    return this._http.get(`additionalList?id=${id}`)
  }
  profilePicture(data: FormData): Observable<any> {
    return this._http.patch('profilePicture', data)
  }
  filterDates(id: string): Observable<any> {
    return this._http.get(`filterDates?id=${id}`)
  }
  filterTimes(id: string, date: string): Observable<any> {
    return this._http.post('filterTimes', { id, date })
  }
  categoriesList(): Observable<any> {
    return this._http.get('categoriesList')
  }
  findService(place?: string, categ?: string, date?: string): Observable<any> {
    return this._http.post('findSearched', { place, categ, date })
  }
  editProfile(name: string, phone: number): Observable<any> {
    return this._http.patch('editProfile', { name, phone })
  }
  updatePassword(currentPassword: string, password: string): Observable<any> {
    return this._http.patch('updatePassword', { currentPassword, password })
  }
  viewDetails(id: string): Observable<any> {
    return this._http.get(`viewDetails?id=${id}`)
  }
  deleteOne(inboxId: string): Observable<any> {
    return this._http.patch('clearOne', { inboxId })
  }
}
