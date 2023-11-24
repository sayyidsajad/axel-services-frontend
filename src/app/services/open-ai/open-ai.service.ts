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
export class OpenAiService {

  constructor(private _http: HttpClient) { }
  sendMessage(message: string): Observable<{ reply: string }> {
    return this._http.post<{ reply: string }>('open-ai/chat', { message }, httpOptions)
  }
}
