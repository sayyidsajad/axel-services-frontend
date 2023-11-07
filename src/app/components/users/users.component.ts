import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  message!: string
  private subscribe: Subscription = new Subscription()

  constructor(private _router: Router, private _userServices: UsersService,private _toastr:ToastrService) { }

  logOut() {
    this.subscribe.add(this._userServices.logOut().subscribe((res) => {
      localStorage.removeItem('userSecret')
      this._router.navigate(['/'])
    }, (err) => {
      this._toastr.error(err.error.message);
    }))
  }
  
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
