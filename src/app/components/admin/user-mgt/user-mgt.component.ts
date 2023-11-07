import { Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { serviceData } from '../../users/home/types/user.types';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-mgt',
  templateUrl: './user-mgt.component.html',
  styleUrls: ['./user-mgt.component.css']
})
export class UserMgtComponent {
  private subscribe: Subscription = new Subscription()
  displayedColumns: string[] = ['name', 'phone', 'isblocked', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _adminServices: AdminService, private _toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.userList()
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

  userList() {
    this.subscribe.add(this._adminServices.userMgt().subscribe((res) => {
      this.dataSource = res.users
    }))
  }

  blockUnblockUser(id: any) {
    this.subscribe.add(
      this._adminServices.blockUnblockUser(id).subscribe((res) => {
        this.userList()
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}


