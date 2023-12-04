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

declare global {
  interface Window {
    initMap: () => void;
  }
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private _scriptLoaderService: ScriptLoaderService, private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _fb: FormBuilder, private _sharedDataService: SharedService) { }
  services!: Array<serviceData>;
  banners!: Array<any>
  homeForm!: FormGroup
  categories!: Array<any>
  place!: any
  date: Date = new Date()
  private subscribe: Subscription = new Subscription()
  @ViewChild('autocomplete') autocomplete!: ElementRef
  private scriptElement: HTMLScriptElement | null = null;


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
      search: [null, Validators.required],
      categ: [null, Validators.required],
      date: [null, Validators.required],
    })
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
    if (this.scriptElement !== null && this.scriptElement.parentNode !== null) {
      this.scriptElement.parentNode.removeChild(this.scriptElement);
      this.scriptElement = null;
    }
    this.subscribe.unsubscribe()
  }
}
