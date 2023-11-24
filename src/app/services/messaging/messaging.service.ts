import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Data } from 'src/app/components/users/chat/types/chat.types';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() { }

  setupSocketConnection(Roomid: string) {
    this.socket = io(environment.socket_endPoint, { query: { Roomid: Roomid } })
  }
  join(roomName: string, Roomid: string) {
    if (this.socket) {
      this.socket.emit('join', { name: roomName, Roomid: Roomid })
    }
  }
  subscribeToMessages = (cb: (err: any, data: { sender: string, text: string, recever: string, data: Data }) => void) => {
    this.socket.on('new-message', (msg: { sender: string, text: string, recever: string, data: Data }) => {
      cb(null, msg);
    });
    return true;
  };
  sendMessage(id: string, message: string, servicerId: string, userId: string, senderType: string, receiverType: string) {
    this.socket.emit('new-message', { data: message, id: id, servicerId: servicerId, userId: userId, senderType: senderType, receiverType: receiverType })
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
