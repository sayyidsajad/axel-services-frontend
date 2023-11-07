import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-servicers-mgt',
  templateUrl: './servicers-mgt.component.html',
  styleUrls: ['./servicers-mgt.component.css']
})
export class ServicersMgtComponent {
  displayedColumns: string[] = ['id', 'servicename', 'email', 'block', 'actions'];
  private subscribe: Subscription = new Subscription()
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _adminServices: AdminService, private _toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listServices()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listServices() {
    this.subscribe.add(
      this._adminServices.listServices().subscribe((res) => {
        this.dataSource = res.services
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
  }

  block(id: string) {
    this.subscribe.add(
      this._adminServices.blockServicer(id).subscribe((res) => {
        this.listServices()
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
