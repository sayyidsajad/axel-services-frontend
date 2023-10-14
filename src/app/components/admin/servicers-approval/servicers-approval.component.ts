import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { serviceData } from '../../users/home/types/user.types';

@Component({
  selector: 'app-servicers-approval',
  templateUrl: './servicers-approval.component.html',
  styleUrls: ['./servicers-approval.component.css']
})
export class ServicersApprovalComponent {
  message!: string;
  approvals!: Array<serviceData>;
  constructor(private adminServices: AdminService) { }
  ngOnInit(): void {
    this.approvals = []
    this.approval()
  }
  approval() {
    this.adminServices.servicersApproval().subscribe(
      (res) => {
        this.approvals = res.approvals
      },
      (err) => {
        if (err.status) {
          this.message = err.error.message
        }
      }
    );
  }
  approve(id: any) {
    this.adminServices.approveServices(id).subscribe((res) => {
    },(err) => {      
      if (err.status) {
        this.message = err.error.message
      }
    })
  }
  cancel(id: any) {
    this.adminServices.cancelApproval(id).subscribe((res) => {
    },(err) => {      
      if (err.status) {
        this.message = err.error.message
      }
    })
  }
}
