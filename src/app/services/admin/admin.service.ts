import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable()

export class AdminService {

  constructor(private _http: HttpClient) { }

  adminLogin(user: object): Observable<any> {
    return this._http.post('admin', user, httpOptions)
  }
  servicersApproval(): Observable<any> {
    return this._http.get(`admin/servicersApproval`, httpOptions)
  }
  approveServices(id: string): Observable<any> {
    return this._http.post('admin/approveServicer', { id }, httpOptions)
  }
  userMgt(): Observable<any> {
    return this._http.get('admin/userMgt', httpOptions)
  }
  blockUnblockUser(id: string): Observable<any> {
    return this._http.post('admin/blockUnblockUser', { id }, httpOptions)
  }
  addCategory(categoryName: string, description: string): Observable<any> {
    return this._http.post('admin/addCategory', { categoryName, description }, httpOptions)
  }
  listCategories(): Observable<any> {
    return this._http.get('admin/listCategories', httpOptions)
  }
  listBookings(): Observable<any> {
    return this._http.get('admin/listBookings', httpOptions)
  }
  logOut(): Observable<any> {
    return this._http.get('admin/logout', httpOptions)
  }
  listUnlist(id: string): Observable<any> {
    return this._http.patch('admin/listUnlist', { id }, httpOptions)
  }
  cancelBooking(textArea: string, bookingId: string, userId: string): Observable<any> {
    return this._http.post('admin/cancelBooking', { textArea, bookingId, userId }, httpOptions)
  }
  listServices(): Observable<any> {
    return this._http.get('admin/listServices', httpOptions)
  }
  blockServicer(id: string): Observable<any> {
    return this._http.post('admin/blockServicer', { id }, httpOptions)
  }
  updateCategory(id: string, categoryName: string, description: string): Observable<any> {
    return this._http.patch('admin/updateCategory', { id, categoryName, description }, httpOptions)
  }
  dashboardReports(): Observable<any> {
    return this._http.get('admin/dashboardReports', httpOptions)
  }
  createBanner(banner: FormData): Observable<any> {
    return this._http.post('admin/createBanner', banner)
  }
  listBanners(): Observable<any> {
    return this._http.get('admin/listBanners', httpOptions)
  }
}
