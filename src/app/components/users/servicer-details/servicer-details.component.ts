import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { serviceData } from '../home/types/user.types';

@Component({
  selector: 'app-servicer-details',
  templateUrl: './servicer-details.component.html',
  styleUrls: ['./servicer-details.component.css']
})
export class ServicerDetailsComponent {
  message!:string
  id!:any
  services!: Array<serviceData>;
constructor(private userServices: UsersService,private route: ActivatedRoute ){}
ngOnInit():void{
  this.id=this.route.snapshot.paramMap.get("id");
  this.services = [];
  this.servicerDetails()
}
servicerDetails() {  
  this.userServices.servicerDetails(this.id).subscribe(
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
}
