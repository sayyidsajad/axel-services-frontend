import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBanner, IBooking, ICategory, IDashboardReport, IService, IServicer, IUser } from './types/admin-types';

@Injectable()

export class AdminService {

  constructor(private _http: HttpClient) { }

  adminLogin(user: object): Observable<{ access_token: string }> {
    return this._http.post<{ access_token: string }>('admin', user)
  }
  servicersApproval(): Observable<IServicer> {
    return this._http.get<IServicer>(`admin/servicersApproval`)
  }
  approveServices(id: string): Observable<any> {
    return this._http.post('admin/approveServicer', id)
  }
  userMgt(): Observable<IUser> {
    return this._http.get<IUser>('admin/userMgt')
  }
  blockUnblockUser(id: string): Observable<{ message: string }> {
    return this._http.post<{ message: string }>('admin/blockUnblockUser', id)
  }
  addCategory(categoryName: string, description: string): Observable<void> {
    return this._http.post<void>('admin/addCategory', { categoryName, description })
  }
  listCategories(): Observable<ICategory> {
    return this._http.get<ICategory>('admin/listCategories')
  }
  listBookings(): Observable<IBooking> {
    return this._http.get<IBooking>('admin/listBookings')
  }
  listUnlist(id: string): Observable<{ message: string }> {
    return this._http.patch<{ message: string }>('admin/listUnlist', id)
  }
  cancelBooking(textArea: string, bookingId: string, userId: string): Observable<void> {
    return this._http.post<void>('admin/cancelBooking', { textArea, bookingId, userId })
  }
  listServices(): Observable<IService> {
    return this._http.get<IService>('admin/listServices')
  }
  blockServicer(id: string): Observable<{ message: string }> {
    return this._http.post<{ message: string }>('admin/blockServicer', id)
  }
  updateCategory(id: string, categoryName: string, description: string): Observable<void> {
    return this._http.patch<void>('admin/updateCategory', { id, categoryName, description })
  }
  dashboardReports(): Observable<IDashboardReport> {
    return this._http.get<IDashboardReport>('admin/dashboardReports')
  }
  createBanner(banner: FormData): Observable<void> {
    return this._http.post<void>('admin/createBanner', banner)
  }
  listBanners(): Observable<IBanner> {
    return this._http.get<IBanner>('admin/listBanners')
  }
}
