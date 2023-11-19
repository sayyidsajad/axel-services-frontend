import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  message!: string
  private subscribe: Subscription = new Subscription()
  constructor(private _router: Router, private _userServices: UsersService, private _toastr: ToastrService) { }
  logOut() {
    this.subscribe.add(this._userServices.logOut().subscribe({
      next: () => {
        localStorage.removeItem(environment.userSecret)
        this._router.navigate(['/'])
      }
    }))
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
