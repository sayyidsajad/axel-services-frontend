import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  constructor() { }
  setupSocketConnection(servicerId: string) {
    this.socket = io(environment.socket_endPoint, { query: { id: servicerId } })
  }
  join(roomName: string) {
    if (this.socket) {
      this.socket.emit('join', { name: roomName })
    }
  }
  subscribeToMessage(cb: (err: any, data: any) => void, room: string) {
    this.socket.on('new-messge', (data) => cb(null, data))
  }
  sendMessage(id: string, message: string) {    
    this.socket.emit('new-message', { data: message, id: id })
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
