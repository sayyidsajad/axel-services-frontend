import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { serviceData } from '../home/types/user.types';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
  constructor(private userServices: UsersService, private router: Router, private _toastr: ToastrService) { }
  services!: Array<serviceData>;
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.servicesList();
  }

  servicesList() {
    this.subscribe.add(
      this.userServices.servicerList().subscribe({
        next:
          (res) => {
            this.services = res.servicesFind;
          }
      }))
  }

  serviceDetails(id: any) {
    this.router.navigate(['/servicerDetails', id])
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
