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
  constructor(private userServices: UsersService, private _toastr: ToastrService) { }
  inboxData!: Array<any>;
  serviceData!: Array<any>
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.userInbox()
  }

  userInbox() {
    this.subscribe.add(this.userServices.userInbox().subscribe(
      (res) => {
        if (!res.inbox.length) {
          this._toastr.error('Your Inbox Empty');
        } else {
          this.inboxData = res.inbox
          this.serviceData = res.service
        }
      },
      (err) => {
        this._toastr.error(err.error.message);
      }
    ))
  }

  clearAll() {
    this.subscribe.add(this.userServices.clearAll().subscribe(
      (res) => {
        this.ngOnInit()
      },
      (err) => {
        this._toastr.error(err.error.message);
      }
    ))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
