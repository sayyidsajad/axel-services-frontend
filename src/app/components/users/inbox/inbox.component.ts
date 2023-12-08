import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {
  constructor(private _userServices: UsersService, private _toastr: ToastrService) { }
  inboxData!: Array<any>;
  serviceData!: Array<any>
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.userInbox()
  }

  userInbox() {
    this.subscribe.add(this._userServices.userInbox().subscribe({
      next: (res) => {
        if (!res.inbox.length) {
          this.inboxData = []
          this._toastr.error('Your Inbox Empty');
        } else {
          this.inboxData = res.inbox   
          console.log(this.inboxData);
                           
          this.serviceData = res.service          
        }
      }
    }))
  }

  clearAll() {
    this.subscribe.add(this._userServices.clearAll().subscribe({
      next:
        () => {
          this.userInbox()
        }
    }))
  }
  deleteOne(inboxId:string) {
    this.subscribe.add(this._userServices.deleteOne(inboxId).subscribe({
      next:
        () => {
          this.userInbox()
        }
    }))
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
