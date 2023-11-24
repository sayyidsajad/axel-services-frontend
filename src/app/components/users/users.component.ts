import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  message!: string
  constructor(private _router: Router) { }
  logOut() {
    localStorage.removeItem(environment.userSecret)
    this._router.navigate(['/'])
  }
}
