import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserProfile } from 'src/app/services/users/types/user-types';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  private subscribe: Subscription = new Subscription()
  userImage!: string
  message!: string
  constructor(private _router: Router,private _userServices:UsersService) { }
  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.subscribe.add(this._userServices.userProfile().subscribe({
      next:
        (res) => {
          this.userImage = res.user.image              
        }
    }))
  }
  logOut() {
    localStorage.removeItem(environment.userSecret)
    this._router.navigate(['/'])
  }
}
