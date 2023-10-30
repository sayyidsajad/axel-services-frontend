import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('form')
  form!: NgForm;
  newMessage$!: Observable<string>;
  // private subscribe: Subscription = new Subscription()
  messages:string[]=[]
  chat!: FormGroup
  constructor(private chatService: MessagingService,private _fb: FormBuilder) { }
  ngOnInit() {
    this.chat = this._fb.group({
      message: ['']
    })
    return this.chatService.getNewMessage().subscribe((message:string)=>{
      this.messages.push(message)
    })
  }
onSubmit(){
  const {message} =this.form.value
  if(!message) return
  
  this.chatService.sendMessage(message)
  this.form.reset()
}
  // ngOnDestroy(): void {
  //   this.subscribe.unsubscribe()
  // }
}
