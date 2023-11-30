import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { serviceData } from './types/user.types';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements AfterViewInit {
  constructor(private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _fb: FormBuilder, private _sharedDataService: SharedService) { }
  services!: Array<serviceData>;
  banners!: Array<any>
  homeForm!: FormGroup
  categories!: Array<any>
  place!: any
  date: Date = new Date()
  private subscribe: Subscription = new Subscription()
  @ViewChild('autocomplete') autocomplete!: ElementRef

  ngOnInit(): void {
    this.categoriesList()
    this.servicesList();
    this.bannerLists()
    this.homeForm = this._fb.group({
      search: [null, Validators.required],
      categ: [null, Validators.required],
      date: [null, Validators.required],
    })
  }

  ngAfterViewInit(): void {
    this.initMap()
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
    } else {
      // this.placeSelected.emit(place.name);
      // this.getNearbyPlaces(place.geometry.location);
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

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
