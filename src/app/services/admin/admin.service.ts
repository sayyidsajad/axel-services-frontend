import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http: HttpClient) { }
  adminLogin(user: any): Observable<any> {
    return this.http.post('admin', user, httpOptions)
  }
  servicersApproval(): Observable<any> {
    return this.http.get(`servicer/servicersApproval`, httpOptions)
  }
  approveServices(id: string): Observable<any> {
    return this.http.post('admin/approveServicer', { id }, httpOptions)
  }
  cancelApproval(id: string): Observable<any> {
    return this.http.post('admin/cancelApproval', { id }, httpOptions)
  }
  userMgt(): Observable<any> {
    return this.http.get('admin/userMgt', httpOptions)
  }
  blockUnblockUser(id: string): Observable<any> {
    return this.http.post('admin/blockUnblockUser', { id }, httpOptions)
  }
  addCategory(category: any): Observable<any> {
    return this.http.post('admin/addCategory', category, httpOptions)
  }
  listCategories(): Observable<any> {
    return this.http.get('admin/listCategories', httpOptions)
  }
  listBookings():Observable<any>{
    return this.http.get('admin/listBookings',httpOptions)
  }
}
