import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { UsersService } from 'src/app/services/users/users.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: any
  id!: string;
  messageForm!: FormGroup
  constructor(private _socketService: MessagingService, private _route: ActivatedRoute, private _fb: FormBuilder, private _toastr: ToastrService, private _userServices: UsersService) { }
  ngOnInit(): void {
    this.recentChat()
    this.messageForm = this._fb.group({
      message: ['', Validators.required],
    })
    this._route.queryParams
      .subscribe(params => {
        this.id = params['id']
        this.recentChat()
        this._socketService.setupSocketConnection(this.id);
        this._socketService.join(this.id)
        this._socketService.subscribeToMessage((err, data) => this.handleMessage(data), this.id)
      }
      );
  }
  recentChat() {
    this._userServices.getRecentChats(this.id).subscribe((res) => {
      this.messages = res.message
    })
  }
  sendMessage() {
    const message = this.messageForm.getRawValue();
    if (this.messageForm.valid) {
      this._socketService.sendMessage(this.id, message.message)
    }
  }
  handleMessage(data: any) {
    this.messages = data
  }
  ngOnDestroy() {
    this._socketService.disconnect();
  }
}
