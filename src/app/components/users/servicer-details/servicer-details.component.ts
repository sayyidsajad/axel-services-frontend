import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
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
  map: google.maps.Map | undefined;
  item: any[] = [];
  reviews!: Array<any>
  expandedIndex = 0;
  items = Array.from({ length: 30 }).map((_, i) => `Item #${i}`);
  id!: any
  wallet!: number
  service!: any;
  images!: GalleryItem[];
  private subscribe: Subscription = new Subscription()
  public date: Date = new Date();
  public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
  public format = 'hh:mm tt';
  totalAmount!: number;
  constructor(private _userServices: UsersService, private _route: ActivatedRoute, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService) { }
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup
  bookingSummary!: FormGroup

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get("id");
    this.servicerDetails()
    this.reviewsList()
    this.additionalServicesList()
    this.initMap();
    this.firstFormGroup = this._fb.group({ date: ['', Validators.required] });
    this.secondFormGroup = this._fb.group({ time: ['', Validators.required] });
    this.thirdFormGroup = this._fb.group({ walletChecked: [false] });
  }
  initMap(): void {
    const mapElement = document.getElementById('map') as HTMLElement;

    if (!mapElement) {
      console.error('Map element not found.');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15,
    });

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
      fields: ['name', 'formatted_address', 'place_id', 'geometry'],
    };

    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
        });

        google.maps.event.addListener(marker, 'click', () => {
          const content = document.createElement('div');

          const nameElement = document.createElement('h2');
          nameElement.textContent = place.name!;
          content.appendChild(nameElement);

          const placeIdElement = document.createElement('p');
          placeIdElement.textContent = place.place_id!;
          content.appendChild(placeIdElement);

          const placeAddressElement = document.createElement('p');
          placeAddressElement.textContent = place.formatted_address!;
          content.appendChild(placeAddressElement);

          infowindow.setContent(content);
          infowindow.open(map, marker);
        });
      }
    });

    this.map = map;
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

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
