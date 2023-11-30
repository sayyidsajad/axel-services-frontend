import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { ChatData } from './types/chat.types';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private subscribe: Subscription = new Subscription()
  messages!: ChatData[];
  id!: string;
  messageForm!: FormGroup
  usersList!: Array<any>
  Roomid!: string;
  servicerId!: string;
  userId!: string

  constructor(private _socketService: MessagingService, private _fb: FormBuilder, private _servicerServices: ServicerService) { }

  ngOnInit(): void {
    this.recentUsersList()
  }

  recentUsersList() {
    this.subscribe.add(this._servicerServices.getRecentUsers().subscribe((res) => {
      this.usersList = res.message
    }))
  }

  recentChat(id: string) {
    this.id = id
    this.messageForm = this._fb.group({
      message: ['', Validators.required],
    })
    this.subscribe.add(this._servicerServices.getRecentChats(id).subscribe({
      next: (res) => {
        this.Roomid = res.id
        this.servicerId = res.servicerId
        this.messages = res.message.messages
        this._socketService.setupSocketConnection(this.Roomid);
        this._socketService.join(this.id, this.Roomid)
      }
    }))
  }

  sendMessage() {
    const message = this.messageForm.getRawValue();
    if (this.messageForm.valid) {
      this._socketService.sendMessage(this.Roomid, message.message, this.id, this.servicerId, 'Servicer', 'User')
      this._socketService.subscribeToMessages((err, data) => this.handleMessage(data))
    }
  }

  handleMessage(data: any) {
    this.messages = data.messages
  }

  ngOnDestroy() {
    this._socketService.disconnect();
  }
}
