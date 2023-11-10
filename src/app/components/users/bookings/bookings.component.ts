import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  constructor(private _userServices: UsersService, public _dialog: MatDialog, private _toastr: ToastrService) { }
  bookings!: Array<any>;
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.bookingsList()
  }

  bookingsList() {
    this.subscribe.add(this._userServices.bookingsList().subscribe(
      (res) => {
        this.bookings = res.bookings;        
      },
      (err) => {
        this._toastr.error(err.error.message);
      }
    ))
  }

  cancel(id: string, amount: string) {
    this.subscribe.add(this._userServices.cancel(id, amount).subscribe((res) => {
      this.bookingsList()
      Swal.fire('Successfully Cancelled', '', 'success')
    }, (err) => {
      this._toastr.error(err.error.message);
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
