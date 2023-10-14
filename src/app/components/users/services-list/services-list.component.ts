import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from 'src/app/services/users/users.service';
import { serviceData } from '../home/types/user.types';
import { Router } from '@angular/router';
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
  constructor(private userServices: UsersService,private router:Router) {}
  services!: Array<serviceData>;
  message!: string;
  ngOnInit(): void {
    this.servicesList();
  }
  servicesList() {
    this.userServices.servicerList().subscribe(
      (res) => {
        this.services = res.servicesFind;
      },
      (err) => {
        if (err.status) {
          this.message = err.error.message
        }
      }
    );
  }
  serviceDetails(id:any){
    this.router.navigate(['/servicerDetails',id])
  }
}
