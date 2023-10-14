import { Component } from '@angular/core';
import { serviceData } from './types/user.types'
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  listServices!: string;
  services!: Array<serviceData>;
  filteredServices!: Array<serviceData>;
  message!: string;
  id!:number
  constructor(private userServices: UsersService,private router:Router,private http:HttpClient) { }
  ngOnInit(): void {
    this.services = [];
    this.filteredServices = []
    this.servicesList();
  }
  servicesList() {
    this.userServices.servicerList().subscribe(
      (res) => {                
        this.services = res.servicesFind;
        this.filteredServices = this.services
        this.filteredServices[0].filter = false
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
  filterByName(serviceName: any) {
    if (serviceName === 'All') {
      this.filteredServices = this.services
      this.filteredServices[0].filter = false
    } else {
      this.filteredServices = this.services.filter((service) => service.serviceName === serviceName);
      this.filteredServices[0].filter = true
    }
  }
  book(id:any){
    this.userServices.bookNow(id).subscribe((res)=>{
      
    })
  }
}








