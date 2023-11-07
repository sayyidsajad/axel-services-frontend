import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  private subscribe: Subscription = new Subscription()
  bookings!: Array<any>;

  constructor(private _servicerServices: ServicerService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.listBookings()
  }

  listBookings() {
    this.subscribe.add(this._servicerServices.listBookings().subscribe((res) => {
      this.bookings = res.bookings
    }, (err) => {
      this._toastr.error(err.error.message);
    }))
  }

  approve(id: string) {
    this.subscribe.add(this._servicerServices.approve(id).subscribe((res) => {
      Swal.fire('Approved')
      this.listBookings()
    }, (err) => {
      this._toastr.error(err.error.message);
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
