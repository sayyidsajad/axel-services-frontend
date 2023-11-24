import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  message!: string

  constructor(private _router: Router) { }

  logOut() {
    localStorage.removeItem(environment.adminSecret)
    this._router.navigate(['/admin'])
  }

}
