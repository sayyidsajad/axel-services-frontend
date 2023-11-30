import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IBooking } from 'src/app/services/users/types/user-component.types';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  dialogForm!: FormGroup
  constructor(private _userServices: UsersService, public _dialog: MatDialog, private _toastr: ToastrService, private _fb: FormBuilder) { }
  bookings!: IBooking[];
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.bookingsList()
  }

  bookingsList() {
    this.subscribe.add(this._userServices.bookingsList().subscribe({
      next: (res) => {
        this.bookings = res.bookings;
      }
    }))
  }

  cancel(id: string, amount: string) {
    this.subscribe.add(
      this._userServices.cancel(id, amount).subscribe({
        next: () => {
          this.bookingsList();
          Swal.fire('Successfully Cancelled', '', 'success');
        }
      })
    );
  }

  review(serviceId: string, userId: string) {
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
              this.reviewMessage(serviceId, userId, user.textArea)
            } else {
              this._toastr.error('Give Your Feedback !');
              this.review(serviceId, userId)
            }
          }
        }
      }
    }))
  }

  reviewMessage(serviceId: string, userId: string, message: string) {
    this.subscribe.add(this._userServices.review(serviceId, userId, message).subscribe({
      complete: () => {
        Swal.fire('Your review has been concerned, Thank YOU !', '', 'success')
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
