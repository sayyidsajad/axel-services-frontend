import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ChatData } from './types/chat.types';
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
  Roomid!: string;
  userId!: string;
  serviceDetails!:any
  constructor(private _socketService: MessagingService, private _route: ActivatedRoute, private _fb: FormBuilder, private _userServices: UsersService) { }

  ngOnInit(): void {
    this.subscribe.add(
      this._route.params.subscribe({
        next: (params) => {
          this.id = params['id'];
          this.servicerDetails()
          this._userServices.getRecentChats(this.id).subscribe({
            next: (res) => {
              this.Roomid = res.message._id;
              this.messages = res.message.messages;
              this.userId = res.userId;
              this._socketService.setupSocketConnection(this.Roomid);
              this._socketService.join(this.id, this.Roomid);
            }
          });
          this.messageForm = this._fb.group({
            message: ['', Validators.required],
          });
        }
      })
    );
  }
  servicerDetails(){
    this.subscribe.add(this._userServices.servicerDetails(this.id).subscribe({
      next: (res) => {
     this.serviceDetails=res.servicesFind     
      }
    }))
  }
  recentChat() {
    this.subscribe.add(this._userServices.getRecentChats(this.id).subscribe({
      next: (res) => {
        this.Roomid = res.id
        this.userId = res.userId
        this.messages = res.message
      }
    }))
  }

  sendMessage() {
    const message = this.messageForm.getRawValue();
    if (this.messageForm.valid) {
      this._socketService.sendMessage(this.Roomid, message.message, this.id, this.userId, 'User', 'Servicer')
      this._socketService.subscribeToMessages((err, data) => this.handleMessage(data))
      this.messageForm.reset()
    }
  }

  handleMessage(data: any) {
    this.messages = data.messages
  }

  ngOnDestroy() {
    this._socketService.disconnect();
    this.subscribe.unsubscribe()
  }
}
