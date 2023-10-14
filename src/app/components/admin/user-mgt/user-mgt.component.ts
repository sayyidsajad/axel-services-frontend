import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { serviceData } from '../../users/home/types/user.types';

@Component({
  selector: 'app-user-mgt',
  templateUrl: './user-mgt.component.html',
  styleUrls: ['./user-mgt.component.css']
})
export class UserMgtComponent {
  users!: Array<serviceData>;
  message!: string;
  constructor(private adminServices: AdminService) { }
  ngOnInit(): void {
    this.userList()
  }
  userList() {
    this.adminServices.userMgt().subscribe((res) => {
      this.users = res.users
    })
  }
  blockUnblockUser(id: any) {
    this.adminServices.blockUnblockUser(id).subscribe((res) => {
      this.ngOnInit()      
    }, (err) => {
      if (err.status) {
        this.message = err.error.message
      }
    })
  }
}
