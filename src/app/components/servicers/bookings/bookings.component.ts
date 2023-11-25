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
    this.subscribe.add(this._servicerServices.listBookings().subscribe({
      next: (res) => {
        this.bookings = res.bookings
        console.log(this.bookings);
        
      }
    }))
  }

  approve(id: string) {
    this.subscribe.add(this._servicerServices.approve(id).subscribe({
      next: () => {
        this.listBookings()
      },
      complete: () => {
        Swal.fire('Approved')
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
