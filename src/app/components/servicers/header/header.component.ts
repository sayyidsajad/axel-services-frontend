import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { environment } from 'src/environments/environment.development';

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
      this._servicerServices.logOut().subscribe({
        next: () => {
          localStorage.removeItem(environment.servicerSecret)
          this._router.navigate(['servicer'])
        }, error: (err) => {
          this._toastr.error(err.error.message);
        }
      }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
