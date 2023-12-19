import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IBooking } from 'src/app/services/users/types/user-component.types';
import { IBookingsListResponse } from 'src/app/services/users/types/user-types';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';
import { Space, WhiteSpace, noNumbersValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  action!: string;
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  @ViewChild('viewDetail')
  viewDetail!: TemplateRef<any>;
  dialogForm!: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: { action: string }, private _userServices: UsersService, public _dialog: MatDialog, private _toastr: ToastrService, private _fb: FormBuilder) {
    this.action = this.data.action;
  }
  bookings!: IBooking[] | undefined;
  bookingDetail!: any;
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.bookingsList()
  }

  bookingsList() {
    this.subscribe.add(
      this._userServices.bookingsList().subscribe(
        (data: IBookingsListResponse) => {
          this.bookings = data.bookings;
        }
      )
    );
  }

  cancel(bookingId: string) {
    const dialogRef = this._dialog.open(this.callAPIDialog, {
      data: {
        action: 'cancel',
      },
    });
    this.dialogForm = this._fb.group({
      textArea: ['', [Validators.required, Space.noSpaceAllowed, WhiteSpace.validate, noNumbersValidator]],
    })
    this.subscribe.add(dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result !== undefined && this.dialogForm.valid) {
          if (result === 'yes') {
            const user = this.dialogForm.getRawValue();
            if (user.textArea !== '') {
              this.cancelBooking(bookingId, user.textArea)
            } else {
              this._toastr.error('Enter the reason to cancel');
              this.cancelBooking(bookingId)
            }
          }
        }
      }
    }))
  }


  viewDetails(id: string) {
    this.subscribe.add(this._userServices.viewDetails(id).subscribe({
      next: (res) => {
        this.bookingDetail = res.bookingDetails
        this._dialog.open(this.viewDetail);
      }
    }))
  }

  cancelBooking(id: string, textArea?: string) {
    this.subscribe.add(this._userServices.cancel(id, textArea).subscribe({
      next: () => {
        this.bookingsList()
      }, complete: () => {
        Swal.fire('Successfully Cancelled', '', 'success')
      }
    }))
  }
  review(serviceId: string, userId: string) {
    const dialogRef = this._dialog.open(this.callAPIDialog, {
      data: {
        action: 'review',
      },
    });
    this.dialogForm = this._fb.group({
      textArea: ['', [Validators.required, Space.noSpaceAllowed, WhiteSpace.validate, noNumbersValidator]],
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
