import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [`
  ::ng-deep nb-layout-column {
    justify-content: center;
    display: flex;
  }
  nb-chat {
    width: 500px;
  }
`],
})
export class ChatComponent {
  messages!: any[];
  id!: string;
  messageForm!: FormGroup
  Roomid!: string;
  userId: any;
  constructor(private _socketService: MessagingService, private _route: ActivatedRoute, private _fb: FormBuilder, private _toastr: ToastrService, private _userServices: UsersService) { }
  ngOnInit(): void {
    this._route.queryParams
      .subscribe(params => {
        this.id = params['id']
        this._userServices.getRecentChats(this.id).subscribe((res) => {          
          this.Roomid = res.message._id
          this.messages = res.message.messages
          console.log(this.messages);
          
          this.userId = res.userId
          this._socketService.setupSocketConnection(this.Roomid);
          this._socketService.join(this.id, this.Roomid)
        })
        this.messageForm = this._fb.group({
          message: ['', Validators.required],
        })
      }
      );
  }
  recentChat() {
    this._userServices.getRecentChats(this.id).subscribe((res) => {
      this.Roomid = res.id
      this.userId = res.userId
      this.messages = res.message
    })
  }
  sendMessage() {
    const message = this.messageForm.getRawValue();
    if (this.messageForm.valid) {
      this._socketService.sendMessage(this.Roomid, message.message, this.id, this.userId, 'User', 'Servicer')
      this._socketService.subscribeToMessages((err, data) => this.handleMessage(data))
    }
  }
  handleMessage(data: any) {
    console.log(data);
    this.messages = data
    
  }
  ngOnDestroy() {
    this._socketService.disconnect();
  }
}
