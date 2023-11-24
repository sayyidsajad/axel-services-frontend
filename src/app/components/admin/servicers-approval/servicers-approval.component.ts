import { Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { serviceData } from '../../users/homepage/types/user.types';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicers-approval',
  templateUrl: './servicers-approval.component.html',
  styleUrls: ['./servicers-approval.component.css']
})
export class ServicersApprovalComponent {
  displayedColumns: string[] = ['id', 'companyname', 'email', 'phone', 'approvalstatus', 'actions'];
  private subscribe: Subscription = new Subscription()
  dataSource: MatTableDataSource<serviceData>;
  paginator!: MatPaginator;
  @ViewChild(MatPaginator)
  approvals!: Array<serviceData>;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _adminServices: AdminService, private _toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.approval()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approval() {
    this.subscribe.add(
      this._adminServices.servicersApproval().subscribe({
        next:
          (res) => {
            this.dataSource = res.approvals
          }
      }))
  }

  approve(id: string) {
    this.subscribe.add(this._adminServices.approveServices(id).subscribe({
      next: (res) => {
        this.approval()
        res.message === "Not Approved" ? this._toastr.warning('Servicer Approval has been cancelled') : this._toastr.success('Servicer has been approved')
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}

