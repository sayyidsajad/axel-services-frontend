import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private socket: Socket) { }
  sendMessage(message: string): void {    
    this.socket.emit('sendMessage', message)
  }
  getNewMessage(): Observable<string> {    
    return this.socket.fromEvent<string>('newMessage')
  }
}
