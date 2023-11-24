import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IUserProfile, IUserProfileResponse } from 'src/app/services/users/types/user-types';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  private subscribe: Subscription = new Subscription()
  userDetails!: IUserProfile
  ngOnInit(): void {
    this.getUser()
  }

  constructor(private _userServices: UsersService) { }

  getUser() {
    this.subscribe.add(this._userServices.userProfile().subscribe({
      next:
        (res) => {
          this.userDetails = res.user
        }
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}


