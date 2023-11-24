import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBanner, IBooking, ICategory, IDashboardReport, IService, IServicer, IUser } from './types/admin-types';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable()

export class AdminService {

  constructor(private _http: HttpClient) { }

  adminLogin(user: object): Observable<{ access_token: string }> {
    return this._http.post<{ access_token: string }>('admin', user, httpOptions)
  }
  servicersApproval(): Observable<IServicer> {
    return this._http.get<IServicer>(`admin/servicersApproval`, httpOptions)
  }
  approveServices(id: string): Observable<any> {
    return this._http.post('admin/approveServicer', { id }, httpOptions)
  }
  userMgt(): Observable<IUser> {
    return this._http.get<IUser>('admin/userMgt', httpOptions)
  }
  blockUnblockUser(id: string): Observable<{ message: string }> {
    return this._http.post<{ message: string }>('admin/blockUnblockUser', { id }, httpOptions)
  }
  addCategory(categoryName: string, description: string): Observable<void> {
    return this._http.post<void>('admin/addCategory', { categoryName, description }, httpOptions)
  }
  listCategories(): Observable<ICategory> {
    return this._http.get<ICategory>('admin/listCategories', httpOptions)
  }
  listBookings(): Observable<IBooking> {
    return this._http.get<IBooking>('admin/listBookings', httpOptions)
  }
  listUnlist(id: string): Observable<{ message: string }> {
    return this._http.patch<{ message: string }>('admin/listUnlist', { id }, httpOptions)
  }
  cancelBooking(textArea: string, bookingId: string, userId: string): Observable<void> {
    return this._http.post<void>('admin/cancelBooking', { textArea, bookingId, userId }, httpOptions)
  }
  listServices(): Observable<IService> {
    return this._http.get<IService>('admin/listServices', httpOptions)
  }
  blockServicer(id: string): Observable<{ message: string }> {
    return this._http.post<{ message: string }>('admin/blockServicer', { id }, httpOptions)
  }
  updateCategory(id: string, categoryName: string, description: string): Observable<void> {
    return this._http.patch<void>('admin/updateCategory', { id, categoryName, description }, httpOptions)
  }
  dashboardReports(): Observable<IDashboardReport> {
    return this._http.get<IDashboardReport>('admin/dashboardReports', httpOptions)
  }
  createBanner(banner: FormData): Observable<void> {
    return this._http.post<void>('admin/createBanner', banner)
  }
  listBanners(): Observable<IBanner> {
    return this._http.get<IBanner>('admin/listBanners', httpOptions)
  }
}
