import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryItem, ImageItem } from 'ng-gallery';
declare var Razorpay: any
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
interface TimeOption {
  value: string;
  viewValue: string;
  disabled?: boolean;
}
@Component({
  selector: 'app-servicer-details',
  templateUrl: './servicer-details.component.html',
  styleUrls: ['./servicer-details.component.css']
})
export class ServicerDetailsComponent {
  public date: Date = new Date();

  hoursOptions = [
    { value: '1am', viewValue: '1 AM' },
    { value: '2am', viewValue: '2 AM' },
    { value: '3am', viewValue: '3 AM' },
    { value: '4am', viewValue: '4 AM' },
    { value: '5am', viewValue: '5 AM' },
    { value: '6am', viewValue: '6 AM' },
    { value: '7am', viewValue: '7 AM' },
    { value: '8am', viewValue: '8 AM' },
    { value: '9am', viewValue: '9 AM' },
    { value: '10am', viewValue: '10 AM' },
    { value: '11am', viewValue: '11 AM' },
    { value: '12pm', viewValue: '12 PM' },
    { value: '1pm', viewValue: '1 PM' },
    { value: '2pm', viewValue: '2 PM' },
    { value: '3pm', viewValue: '3 PM' },
    { value: '4pm', viewValue: '4 PM' },
    { value: '5pm', viewValue: '5 PM' },
    { value: '6pm', viewValue: '6 PM' },
    { value: '7pm', viewValue: '7 PM' },
    { value: '8pm', viewValue: '8 PM' },
    { value: '9pm', viewValue: '9 PM' },
    { value: '10pm', viewValue: '10 PM' },
    { value: '11pm', viewValue: '11 PM' },
    { value: '12am', viewValue: '12 AM' },
  ] as TimeOption[]

  backendDates: any[] = []; 
  map: google.maps.Map | undefined;
  item: any[] = [];
  reviews!: Array<any>
  secondFormGroup!: FormGroup
  items = Array.from({ length: 30 }).map((_, i) => `Item #${i}`);
  id!: any
  wallet!: number
  service!: any;
  images!: GalleryItem[];
  private subscribe: Subscription = new Subscription()
  totalAmount!: number;
  constructor(private _userServices: UsersService, private _route: ActivatedRoute, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService) {
  }
  firstFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup
  bookingSummary!: FormGroup
  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get("id");
    this.servicerDetails()
    this.reviewsList()
    this.additionalServicesList()
    this.firstFormGroup = this._fb.group({
      date: [null, Validators.required],
    });
    this.secondFormGroup = this._fb.group({
      time: [null, Validators.required],
    });
    this.thirdFormGroup = this._fb.group({ walletChecked: [false] });
    this.filterDates()
  }
  servicerDetails() {
    this.subscribe.add(this._userServices.servicerDetails(this.id).subscribe({
      next: (res) => {
        this.service = res.servicesFind;
        this.totalAmount = this.service.amount
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
      this.subscribe.add(this._userServices.bookNow(this.id, firstField.date,secondField.time, this.wallet).subscribe({
        next: (res) => {
          const inputDate = moment(firstField.date);
          const formattedDate = inputDate.format("ddd MMM DD YYYY HH:mm:ss [GMT]Z") + " (India Standard Time)";   
          this.bookNow(formattedDate,secondField.time, res)
        }
      }))
    } else {
      this.subscribe.add(this._userServices.bookNow(this.id, firstField.date,secondField.time).subscribe({
        next: (res) => {
          const inputDate = moment(firstField.date);
          const formattedDate = inputDate.format("ddd MMM DD YYYY HH:mm:ss [GMT]Z") + " (India Standard Time)";          
          this.bookNow(formattedDate,secondField.time, res)
        }
      }))
    }
  }
  bookNow(date: string,time:string, inserted: any) {
    const reducedAmt = inserted['reducedAmt'] ? (+this.totalAmount - this.wallet) : +this.totalAmount
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
        this.reviews = res.reviews
      }
    }))
  }
  additionalServicesList() {
    this.subscribe.add(this._userServices.additionalServices(this.id).subscribe({
      next: (res) => {
        this.item = res.additional;
      }
    }))
  }
  handleCheckboxChange(service: any) {
    if (service.selected) {
      this.totalAmount += service.amount;
    } else {
      this.totalAmount -= service.amount;
    }
  }
  filterDates() {
    this.subscribe.add(this._userServices.filterDates(this.id).subscribe({
      next: (res) => {
        this.backendDates = res.filterDates;
    }
    }));
  }

  
  isDateSelectable = (date: Date): boolean => {
    const formattedDate =date
    const isDateDisabled = this.backendDates.includes(formattedDate);
    console.log(`Formatted Date: ${formattedDate}`);
    console.log(`Is Disabled: ${isDateDisabled}`);
    console.log(`Array(4) 'this is the backend dates'`);

    return !isDateDisabled;
  };
  
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
