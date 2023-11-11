import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from 'src/app/services/users/users.service';
import { serviceData } from '../home/types/user.types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
export interface ChipColor {
  name: string;
  color: ThemePalette;
}
@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css'],
})
export class ServicesListComponent {
  availableColors: ChipColor[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' },
  ];
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
          }, error:
          (err) => {
            this._toastr.error(err.error.message);
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
