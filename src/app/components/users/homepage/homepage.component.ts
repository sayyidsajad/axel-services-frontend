import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { serviceData } from './types/user.types';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
  constructor(private _userServices: UsersService, private _router: Router, private _toastr: ToastrService) { }
  services!: Array<serviceData>;
  banners!: Array<any>
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.bannerLists()
    this.servicesList();
  }
  bannerLists() {
    this._userServices.listBanners().subscribe({
      next: (res) => {
        this.banners = res.banners
      }
    });

  }
  servicesList() {
    this.subscribe.add(
      this._userServices.servicerList().subscribe({
        next:
          (res) => {
            this.services = res.servicesFind;            
          }
      }))
  }

  serviceDetails(id: string) {
    this._router.navigate(['/servicerDetails', id])
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
