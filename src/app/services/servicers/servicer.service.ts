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

export class ServicerService {
  constructor(private http: HttpClient) { }
  servicerRegister(user: any): Observable<any> {
    return this.http.post(`servicer/signup`, user, httpOptions)
  }
  servicerLogin(user: any): Observable<any> {
    return this.http.post(`servicer`, user, httpOptions)
  }
  servicerVerification(user: any, id: number): Observable<any> {
    return this.http.post(`servicer/servicerProcedures?id=${id}`, user, httpOptions)
  }
  sendMail(id: any): Observable<any> {
    return this.http.get(`servicer/servicerOtpVerification?id=${id}`, httpOptions)
  }
  servicerDashboard(id: string): Observable<any> {
    return this.http.post('servicer/servicerDashboard', { id }, httpOptions)
  }
  categoriesList(): Observable<any> {
    return this.http.get('servicer/categoriesList')
  }
}
