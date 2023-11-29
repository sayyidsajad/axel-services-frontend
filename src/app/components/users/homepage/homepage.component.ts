import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { serviceData } from './types/user.types';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements AfterViewInit {
  constructor(private _userServices: UsersService, private _router: Router, private _toastr: ToastrService) { }
  services!: Array<serviceData>;
  banners!: Array<any>
  private subscribe: Subscription = new Subscription()
  @ViewChild('autocomplete') autocomplete!: ElementRef

  ngOnInit(): void {
    this.bannerLists()
    this.servicesList();
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

    if (!place.geometry) {
      inputElement.placeholder = 'Enter your location...';
    } else {
      // this.placeSelected.emit(place.name);
      // this.getNearbyPlaces(place.geometry.location);
    }
  }

  serviceDetails(id: string) {
    this._router.navigate(['/servicerDetails', id])
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
