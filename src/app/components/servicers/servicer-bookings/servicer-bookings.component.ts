import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicer-bookings',
  templateUrl: './servicer-bookings.component.html',
  styleUrls: ['./servicer-bookings.component.css']
})
export class ServicerBookingsComponent {
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

  constructor(private _servicerServices: ServicerService, public _dialog: MatDialog, private _fb: FormBuilder, private _toastr: ToastrService) {
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
    this.subscribe.add(this._servicerServices.listBookings().subscribe({
      next: (res) => {
        this.dataSource = res.bookings
      }, error: (err) => {
        this._toastr.error(err.error.message);
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
              this._toastr.error('Enter the reason to cancel.');
              this.cancelReason(bookingId, userId)
            }
          }
        }
      }, error: (err) => {
        this._toastr.error(err.error.message);
      }
    }))
  }

  cancelBooking(textArea: any, bookingId: any, userId: any) {
    this.subscribe.add(this._servicerServices.cancelBooking(textArea, bookingId, userId).subscribe({
      next: () => {
        this.listBookings()
      }, error: (err) => {
        this._toastr.error(err.error.message);
      },
      complete: () => {
        Swal.fire('Successfully Cancelled', '', 'success')
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
