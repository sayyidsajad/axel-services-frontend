import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ServicerService {

  constructor(private _http: HttpClient) { }

  servicerRegister(companyName: string, email: string, phone: number, password: string, confirmPassword: string): Observable<any> {
    return this._http.post('servicer/signup', { companyName, email, phone, password, confirmPassword })
  }
  servicerLogin(user: object): Observable<any> {
    return this._http.post('servicer', user)
  }
  servicerVerification(data: FormData, id: string): Observable<any> {
    return this._http.post(`servicer/servicerProcedures?id=${id}`, data)
  }
  sendMail(id: string): Observable<any> {
    return this._http.get(`servicer/servicerOtpVerification?id=${id}`)
  }
  servicerDashboard(id: string): Observable<any> {
    return this._http.post('servicer/servicerDashboard', { id })
  }
  categoriesList(): Observable<any> {
    return this._http.get('servicer/categoriesList')
  }
  listBookings(): Observable<any> {
    return this._http.get('servicer/listBookings')
  }
  approve(id: string): Observable<any> {
    return this._http.post('servicer/approveBooking', id)
  }
  cancelBooking(bookingId: string, userId: string, status: string, textArea?: string,): Observable<any> {
    return this._http.post('servicer/cancelBooking', { bookingId, userId, status, textArea })
  }
  getRecentUsers(): Observable<any> {
    return this._http.get('servicer/getRecentUsers')
  }
  getRecentChats(id: string): Observable<any> {
    return this._http.get(`servicer/getRecentChats?id=${id}`)
  }
  dashboardReports(): Observable<any> {
    return this._http.get('servicer/dashboardReports')
  }
  additionalServices(): Observable<any> {
    return this._http.get('servicer/additionalList')
  }
  createService(data: FormData): Observable<any> {
    return this._http.post('servicer/createService', data)
  }
  updateService(data: any): Observable<any> {
    return this._http.patch('servicer/updateService', data)
  }
  listUnlist(id: string): Observable<any> {
    return this._http.patch('servicer/listUnlist', { id })
  }
  getMyDetails(): Observable<any> {
    return this._http.get('servicer/getMyDetails')
  }
  servicerRecaptcha(recaptcha: string): Observable<any> {    
    return this._http.get(`servicer/recaptcha?recaptcha=${recaptcha}`)
  }
}
