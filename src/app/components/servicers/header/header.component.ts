import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  message!: string
  private subscribe: Subscription = new Subscription()

  constructor(private _servicerServices: ServicerService, private _router: Router, private _toastr: ToastrService) { }

  logOut() {
    this.subscribe.add(
      this._servicerServices.logOut().subscribe((res) => {
        localStorage.removeItem('servicerSecret')
        this._router.navigate(['servicer'])
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
