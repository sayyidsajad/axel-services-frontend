import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  message!: string
  private subscribe:Subscription=new Subscription()
  constructor(private _adminServices: AdminService, private _router: Router,private _toastr:ToastrService) { }
  logOut() {
    this.subscribe.add( this._adminServices.logOut().subscribe((res) => {
      localStorage.removeItem('adminSecret')
      this._router.navigate(['/admin'])
    }, (err) => {
      this._toastr.error(err.error.message);
    })
  )
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
