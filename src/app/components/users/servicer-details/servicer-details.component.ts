import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { serviceData } from '../homepage/types/user.types';
import { Subscription } from 'rxjs';
import { PickerInteractionMode } from 'igniteui-angular';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryItem, ImageItem } from 'ng-gallery';
declare var Razorpay: any
@Component({
  selector: 'app-servicer-details',
  templateUrl: './servicer-details.component.html',
  styleUrls: ['./servicer-details.component.css']
})
export class ServicerDetailsComponent {
  items = Array.from({ length: 30 }).map((_, i) => `Item #${i}`);
  id!: any
  wallet!: number
  service!: any;
  images!: GalleryItem[];
  private subscribe: Subscription = new Subscription()
  public date: Date = new Date();
  public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
  public format = 'hh:mm tt';
  constructor(private _userServices: UsersService, private _route: ActivatedRoute, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService) { }
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup
  bookingSummary!: FormGroup

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get("id");
    this.servicerDetails()
    this.reviewsList()
    this.firstFormGroup = this._fb.group({ date: ['', Validators.required] });
    this.secondFormGroup = this._fb.group({ time: ['', Validators.required] });
    this.thirdFormGroup = this._fb.group({ walletChecked: [false] });
  }

  servicerDetails() {
    this.subscribe.add(this._userServices.servicerDetails(this.id).subscribe({
      next: (res) => {
        console.log(res);

        this.service = res.servicesFind;
        this.wallet = res.wallet || 0
        this.images = this.service.images.map(
          (item: any) => new ImageItem({ src: item, thumb: item })
        );
      }
    }))
  }

  Done() {
    const firstField = this.firstFormGroup.getRawValue()
    const secondField = this.secondFormGroup.getRawValue()
    const thirdField = this.thirdFormGroup.getRawValue()
    if (thirdField.walletChecked) {
      this.subscribe.add(this._userServices.bookNow(this.id, firstField.date, secondField.time, this.wallet).subscribe({
        next: (res) => {
          this.bookNow(firstField.date, secondField.time, res)
        }
      }))
    } else {
      this.subscribe.add(this._userServices.bookNow(this.id, firstField.date, secondField.time).subscribe({
        next: (res) => {
          this.bookNow(firstField.date, secondField.time, res)
        }
      }))
    }
  }

  bookNow(date: Date, time: any, inserted: any) {
    const reducedAmt = inserted['reducedAmt'] ? (+this.service.amount - this.wallet) : +this.service.amount
    const RazorpayOptions = {
      description: 'Sample Razorpay Demo',
      currency: 'INR',
      amount: +reducedAmt * 100,
      name: 'Axel Services',
      key: environment.razorKey,
      handler: (res: any) => {
        this.verifypayment(res, inserted)
      },
      image: 'https://i.pinimg.com/originals/50/e1/c7/50e1c728047b2f7a7353e196f5b2c363.png',
      prefill: {
        name: 'Axel Services',
        email: environment.razorEmail,
        phone: environment.razorPhone
      },
      theme: {
        color: '#000000'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    }
    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }
    const failureCallback = (e: any) => {
      this._toastr.error(e)
    }
    Razorpay.open(RazorpayOptions, successCallback, failureCallback)
  }

  verifypayment(response: object, inserted: object) {
    this._userServices.verifyPayment(response, inserted)
      .subscribe({
        next: () => {
          this._router.navigate(['servicerDetails', this.id]);
        }, complete: () => {
          this._toastr.success("Payment success");
        }
      })
  }
  reviewsList() {
    this.subscribe.add(this._userServices.reviewsList(this.id).subscribe({
      next: (res) => {
        console.log(res);
      }
    }))
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
