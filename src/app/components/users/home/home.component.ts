import { Component } from '@angular/core';
import { serviceData } from './types/user.types'
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredServices!: Array<any>;
  categoryList!: Array<string>;
  services!: Array<any>;
  filteredServices!: Array<any>;
  id!: number
  private subscribe: Subscription = new Subscription()

  constructor(private _userServices: UsersService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.servicesList();
  }
  servicesList() {
    this.subscribe.add(this._userServices.servicerList().subscribe(
      (res) => {
        this.services = res.servicesFind;
        this.categoryList = this.services.map(item => item.categoryInfo.categoryName)
        this.featuredServices = this.services.reverse()
      },
      (err) => {
        this._toastr.error(err.error.message);
      }
    ))
  }
  serviceDetails(id: any) {
    this._router.navigate(['/servicerDetails', id])
  }
  // bookNow(id: string) {
  //   let userId = localStorage.getItem('userSecret')
  //   this.subscribe.add(this.userServices.bookNow(id).subscribe((res) => {
  //     Swal.fire('Successfully Booked', '', 'success')
  //   }))
  // }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}








