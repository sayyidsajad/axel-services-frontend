import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { serviceData } from './types/user.types';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';
import { environment } from 'src/environments/environment.development';
import { ScriptLoaderService } from 'src/app/services/scripts/script-loader.service';
import { Space, WhiteSpace } from '../../validators/custom-validators';

declare global {
  interface Window {
    initMap: () => void;
  }
}
interface TimeOption {
  value: string;
  viewValue: string;
  disabled?: boolean;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private _scriptLoaderService: ScriptLoaderService, private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _fb: FormBuilder, private _sharedDataService: SharedService) { }
  services!: Array<serviceData>;
  hours!: any
  updatedHours = [] as TimeOption[]
  hoursOptions = [
    { value: '1am', viewValue: '1 AM', },
    { value: '2am', viewValue: '2 AM', },
    { value: '3am', viewValue: '3 AM', },
    { value: '4am', viewValue: '4 AM', },
    { value: '5am', viewValue: '5 AM', },
    { value: '6am', viewValue: '6 AM', },
    { value: '7am', viewValue: '7 AM', },
    { value: '8am', viewValue: '8 AM', },
    { value: '9am', viewValue: '9 AM', },
    { value: '10am', viewValue: '10 AM', },
    { value: '11am', viewValue: '11 AM', },
    { value: '12pm', viewValue: '12 PM', },
    { value: '1pm', viewValue: '1 PM' },
    { value: '2pm', viewValue: '2 PM', },
    { value: '3pm', viewValue: '3 PM', },
    { value: '4pm', viewValue: '4 PM', },
    { value: '5pm', viewValue: '5 PM', },
    { value: '6pm', viewValue: '6 PM', },
    { value: '7pm', viewValue: '7 PM', },
    { value: '8pm', viewValue: '8 PM', },
    { value: '9pm', viewValue: '9 PM', },
    { value: '10pm', viewValue: '10 PM', },
    { value: '11pm', viewValue: '11 PM', },
    { value: '12am', viewValue: '12 AM', },
  ] as TimeOption[]
  banners!: Array<any>
  homeForm!: FormGroup
  categories!: Array<any>
  place!: any
  date: Date = new Date()
  private subscribe: Subscription = new Subscription()
  @ViewChild('autocomplete') autocomplete!: ElementRef
  private scriptElement: HTMLScriptElement | null = null;
  allTimesBooked: boolean = false;
  backendDates: any[] = [];

  ngOnInit(): void {
    window['initMap'] = () => {
      this.initMap();
    }
    this.subscribe.add(
      this._scriptLoaderService.loadScript(environment.googleMapScript, () => {
      })
    );
    this.categoriesList()
    this.servicesList();
    this.bannerLists()
    this.homeForm = this._fb.group({
      search: [null, [Validators.required, WhiteSpace.validate]],
      categ: [null, Validators.required],
      date: [null, Validators.required],
    });
    
  }


  bannerLists() {
    this._userServices.listBanners().subscribe({
      next: (res) => {
        this.banners = res.banners
      }
    });
  }

  servicesList() {
    this.subscribe.add(
      this._userServices.servicerList().subscribe({
        next:
          (res: any) => {
            this.services = res.servicesFind.serviceList;
          }
      }))
  }
  categoriesList() {
    this.subscribe.add(
      this._userServices.categoriesList().subscribe({
        next:
          (res: any) => {
            this.categories = res.categories
          }
      }))
  }
  getErrorMessage(controlName: string): string {
    const control = this.homeForm.get(controlName);
  
    if (!control || !control.invalid) {
      return '';
    }
  
    const fieldName = this.capitalizeFirstLetter(controlName);
  
    if (control.hasError('required')) {
      return `${fieldName} is required`;
    }
  
    if (control.hasError('whitespace')) {
      return `${fieldName} cannot contain whitespaces`;
    }
  
    if (control.hasError('noSpaceAllowed')) {
      return `${fieldName} cannot contain spaces`;
    }
  
    if (controlName === 'search') {
      if (control.hasError('noNumbers')) {
        return `${fieldName} cannot contain numbers`;
      }
    }
  
    return `Invalid ${fieldName}`;
  }
  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  initMap() {
    const inputElement = this.autocomplete.nativeElement;
    const autocomplete = new google.maps.places.Autocomplete(
      inputElement,
      {
        types: ['geocode'],
        componentRestrictions: { 'country': ['IN'] },
        fields: ['place_id', 'geometry', 'name'],
      });

    autocomplete.addListener('place_changed', () => {
      this.onSelected(autocomplete);
    });
  }

  onSelected(autocomplete: any) {
    const inputElement = this.autocomplete.nativeElement;
    const place = autocomplete.getPlace();
    if (place.name) {
      this.place = place.name
    }
    if (!place.geometry) {
      inputElement.placeholder = 'Enter your location...';
    }
  }
  onSubmit(): any {
    const filtered = this.homeForm.getRawValue();
    if (!filtered || !this.homeForm.valid) {
      return this._toastr.warning('Please fill the fields');
    }
    this.subscribe.add(
      this._userServices.findService(this.place, filtered.categ, filtered.date).subscribe({
        next: (res: any) => {
          this._sharedDataService.setSharedData(res);
          this._router.navigate(['/servicesList']);
        },
        error: (err: any) => {
          this.homeForm.reset();
        }
      })
    );
  }

  serviceDetails(id: string) {
    this._router.navigate(['/servicerDetails', id])
  }
  // filterDates() {
  //   this.subscribe.add(this._userServices.filterDates(this.id).subscribe({
  //     next: (res) => {
  //       this.backendDates = res.filterDates;
  //     }
  //   }));
  // }
  // addEvent(event: MatDatepickerInputEvent<any>) {
  //   this.subscribe.add(this._userServices.filterTimes(this.id, event.value).subscribe({
  //     next: (res) => {
  //       this.updatedHours = this.hoursOptions.filter((option) => {
  //         return !res.filterTimes.includes(option.value);
  //       });        
  //       const allTimesBooked = this.updatedHours.length === 0;
  //       this.allTimesBooked = allTimesBooked;
  //       const currentTime = new Date();
  //       const currentHour = currentTime.getHours();
  //       const currentMinutes = currentTime.getMinutes();
  //       const filteredTimeOptions = this.updatedHours.filter((option) => {
  //         const [optionHour, optionMinutes] = option.value.split(/(\d+)(\D+)/).filter(Boolean);
  //         const optionHourInt = parseInt(optionHour, 10);
  //         const optionMinutesInt = parseInt(optionMinutes, 10);
  //         const isLaterThanCurrentTime =
  //           optionHourInt > currentHour || (optionHourInt === currentHour && optionMinutesInt > currentMinutes);
  //         return isLaterThanCurrentTime;
  //       });
  //     }
  //   }));
  // }

  myFilter = (d: Date | null): boolean => {
    if (!d) {
      return true;
    }
    const backendDateTimeObjects = this.backendDates.map((backendDate) => new Date(backendDate));
    const isDisabledDate = backendDateTimeObjects.some((backendDateTime) =>
      this.isSameDate(d, backendDateTime)
    );

    if (isDisabledDate) {
      this.allTimesBooked = this.hoursOptions.every((option) =>
        backendDateTimeObjects.some(
          (backendDateTime) =>
            this.isSameDate(d, backendDateTime) &&
            backendDateTime.getHours() === parseInt(option.value, 10)
        )
      );

      return this.allTimesBooked;
    }

    this.allTimesBooked = false;

    return false;
  };


  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  ngOnDestroy(): void {
    if (this.scriptElement !== null && this.scriptElement.parentNode !== null) {
      this.scriptElement.parentNode.removeChild(this.scriptElement);
      this.scriptElement = null;
    }
    this.subscribe.unsubscribe()
  }
}
