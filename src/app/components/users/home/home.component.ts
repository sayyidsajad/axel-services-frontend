import { Component } from '@angular/core';
import { serviceData } from './types/user.types'
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selected!: Date | null;
  featuredServices!: Array<any>;
  categoryList!: Array<string>;
  services!: Array<any>;
  filteredServices!: Array<any>;
  id!: number
  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup
  private subscribe: Subscription = new Subscription()

  constructor(private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this._fb.group({
      firstCtrl: ['', Validators.required],
    });
    this._fb.group({
      secondCtrl: ['', Validators.required],
    });
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
  
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}








