import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  private subscribe: Subscription = new Subscription()
  userDetails!: any
  ngOnInit(): void {
    this.userDetails = []
    this.getUser()
  }

  constructor(private _userServices: UsersService,private _toastr:ToastrService) { }
  getUser() {
    this.subscribe.add(this._userServices.userProfile().subscribe(
      (res) => {
        this.userDetails = res.user        
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


