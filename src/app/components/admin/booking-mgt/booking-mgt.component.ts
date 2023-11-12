import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-mgt',
  templateUrl: './booking-mgt.component.html',
  styleUrls: ['./booking-mgt.component.css']
})
export class BookingMgtComponent {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  bookings!: Array<any>;
  dialogForm!: FormGroup
  private subscribe: Subscription = new Subscription()
  displayedColumns: string[] = ['id', 'companyname', 'email', 'phone', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _adminServices: AdminService, public _dialog: MatDialog, private _fb: FormBuilder, private _toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listBookings()
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

  listBookings() {
    this.subscribe.add(this._adminServices.listBookings().subscribe({
      next: (res) => {
        this.dataSource = res.bookings
      }
    }))
  }

  cancelReason(bookingId: string, userId: string) {
    const dialogRef = this._dialog.open(this.callAPIDialog);
    this.dialogForm = this._fb.group({
      textArea: ['', Validators.required],
    })
    this.subscribe.add(dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result !== undefined) {
          if (result === 'yes') {
            const user = this.dialogForm.getRawValue();
            if (user.textArea !== '') {
              this.cancelBooking(user.textArea, bookingId, userId)
            } else {
              this._toastr.error('Enter the reason to cancel');
              this.cancelReason(bookingId, userId)
            }
          }
        }
      }
    }))
  }

  cancelBooking(textArea: any, bookingId: any, userId: any) {
    this.subscribe.add(this._adminServices.cancelBooking(textArea, bookingId, userId).subscribe({
      next: () => {
        this.listBookings()
      }, complete: () => {
        Swal.fire('Successfully Cancelled', '', 'success')
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}

