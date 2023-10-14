import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) { }
  userRegister(user: any): Observable<any> {
    return this.http.post(`signup`, user, httpOptions)
  }
  userLogin(user: any): Observable<any> {
    return this.http.post('', user, httpOptions)
  }
  servicerList(): Observable<any> {
    return this.http.get('servicer/servicerList', httpOptions)
  }
  sendMail(email: any): Observable<any> {
    return this.http.get(`otpVerification?email=${email}`, httpOptions)
  }
  loadHome(): Observable<any> {    
    return this.http.get('home', httpOptions)
  }
  servicerDetails(id:string): Observable<any> {  
    return this.http.get(`servicer/servicerDetails/?id=${id}`, httpOptions)
  }
  bookNow(id:any){
    return this.http.post(`bookNow`,{id},httpOptions)
  }
}
