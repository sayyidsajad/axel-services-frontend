import { Component } from '@angular/core';
import { bookingData } from './types/bookings.types';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-booking-mgt',
  templateUrl: './booking-mgt.component.html',
  styleUrls: ['./booking-mgt.component.css']
})
export class BookingMgtComponent {
  message!: string
  bookings!: Array<bookingData>;
  constructor(private adminServices: AdminService) { }
  ngOnInit(): void {
    this.listBookings()
  }
  listBookings() {
    this.adminServices.listBookings().subscribe((res) => {
      this.bookings=res.bookings      
    }, (err) => {
      if (err.status) {
        this.message = err.error.message
      }
    })
  }
}
