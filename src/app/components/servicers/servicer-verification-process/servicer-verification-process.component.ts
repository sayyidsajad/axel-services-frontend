import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Space, WhiteSpace } from '../../validators/custom-validators';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { categoryData } from '../../admin/category-mgt/types/categories.types';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScriptLoaderService } from 'src/app/services/scripts/script-loader.service';

interface AddressNameFormat {
  street_number: string;
  route: string;
  locality: string;
  administrative_area_level_1: string;
  country: string;
  postal_code: string;
}
@Component({
  selector: 'app-servicer-verification-process',
  templateUrl: './servicer-verification-process.component.html',
  styleUrls: ['./servicer-verification-process.component.css']
})
export class ServicerVerificationProcessComponent {
  selectedImage: SafeUrl | null = null; docs: File[] = [];
  length!: number;
  selectedFile!: File | null
  submit: boolean = false
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  id!: string
  categories!: Array<categoryData>;
  private subscribe: Subscription = new Subscription()
  constructor(private _scriptLoaderService: ScriptLoaderService, private _sanitizer: DomSanitizer, private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router, private _route: ActivatedRoute, private _toastr: ToastrService) { }
  ngOnInit(): void {
    this.subscribe.add(this._route.queryParams
      .subscribe({
        next: (params: any) => {
          this.id = params['id']
        }
      }))
    this.firstFormGroup = this._fb.group({
      serviceName: ['', [Validators.required, WhiteSpace.validate]],
      description: ['', [Validators.required, WhiteSpace.validate]],
      category: ['', Validators.required],
      amount: ['', [Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Space.noSpaceAllowed]],
      img: ['', Validators.required],
    })
    this.secondFormGroup = this._fb.group({
      formattedAddress: ['', Validators.required],
    });
    this.thirdFormGroup = this._fb.group({
      docs: ['', Validators.required],
    });
    this.categoriesList()
  }
  private fillInAddress!: (place: any) => void;
  private renderAddress!: (place: any) => void;
  initMap() {
    const CONFIGURATION = {
      "ctaTitle": "Checkout",
      "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 11, "zoomControl": true, "maxZoom": 22, "mapId": "" },
      "mapsApiKey": environment.mapApiKey,
      "capabilities": { "addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true }
    };
    const componentForm = [
      'location',
      'locality',
      'administrative_area_level_1',
      'country',
      'postal_code',
    ];
    const mapElement = document.getElementById("gmp-map");
    if (!mapElement) {
      this._toastr.error('Please Enter A Valid Address')
      return;
    }
    const getFormInputElement = (component: string) => document.getElementById(component + '-input') as HTMLInputElement;
    const map = new google.maps.Map(mapElement, {
      zoom: CONFIGURATION.mapOptions.zoom,
      center: { lat: 37.4221, lng: -122.0841 },
      mapTypeControl: false,
      fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
      zoomControl: CONFIGURATION.mapOptions.zoomControl,
      streetViewControl: CONFIGURATION.mapOptions.streetViewControl
    });
    const marker = new google.maps.Marker({ map: map, draggable: false });
    const autocompleteInput = getFormInputElement('location');
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
      fields: ["address_components", "geometry", "name"],
      types: ["address"],
    });
    autocomplete.addListener('place_changed', () => {
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        this._toastr.error('No details available for the place: \'' + place.name + '\'')
        return;
      }
      this.renderAddress(place);
      this.fillInAddress(place);
    });
    this.fillInAddress = (place) => {
      const addressNameFormat: AddressNameFormat = {
        'street_number': 'short_name',
        'route': 'long_name',
        'locality': 'long_name',
        'administrative_area_level_1': 'short_name',
        'country': 'long_name',
        'postal_code': 'short_name',
      };
      const getAddressComp = function (type: keyof AddressNameFormat) {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormat[type]];
          }
        }
        return '';
      };
      getFormInputElement('location').value = getAddressComp('street_number') + ' '
        + getAddressComp('route');
      for (const component of componentForm) {
        if (component !== 'location') {
          getFormInputElement(component).value = getAddressComp(component as keyof AddressNameFormat);
        }
      }
    };
    this.renderAddress = (place) => {
      if (place.formatted_address) {
        this.secondFormGroup.get('formattedAddress')?.setValue(place.formatted_address);
      } else {
        const formattedLongNames = place.address_components.map((component: any) => component.long_name);
        const formattedAddress = formattedLongNames.join(', ');
        this.secondFormGroup.get('formattedAddress')?.setValue(formattedAddress);
      }
      map.setCenter(place.geometry.location);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    };
  }
  currentLocation() {
    if (!navigator.geolocation) {
      this._toastr.error('No address details available for the location.');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.getReverseGeocodingData(position.coords.latitude, position.coords.longitude)
    })
  }
  getReverseGeocodingData(lat: number, lng: number) {
    const latlng = new google.maps.LatLng(lat, lng);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        this._toastr.warning(status);
      }
      if (status === google.maps.GeocoderStatus.OK) {
        const place = results[0];
        if (place && place.formatted_address) {
          this.renderAddress(place);
          this.fillInAddress(place);
        } else {
          this._toastr.error('No address details available for the location.');
        }
      }
    });
  }
  onStepChange(event: any) {
    if (event.selectedIndex === 1) {
      window['initMap'] = () => {
        this.initMap();
      }
      this.subscribe.add(
        this._scriptLoaderService.loadScript(environment.googleMapScript, () => {
        })
      );
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
    this.selectedImage = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));
  }
  onDeleteImage() {
    this.selectedFile = null
    this.selectedImage = null;
    const fileInput = document.getElementById('file_input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  categoriesList() {
    this.subscribe.add(
      this._servicerServices.categoriesList().subscribe({
        next: (res) => {
          this.categories = res.categories
        }
      }))
  }
  onFileChange(event: any): void {
    const selectedFiles = event.target.files;
    this.docs = Array.from(selectedFiles);
    this.length = this.docs.length;
  }

  getSanitizedUrl(file: File): SafeUrl {
    return this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  onDeleteImages(index: number): void {
    this.docs.splice(index, 1);
  }

  verifyService() {
    const data = new FormData()
    data.append('serviceName', this.firstFormGroup?.get('serviceName')?.value);
    data.append('description', this.firstFormGroup?.get('description')?.value);
    data.append('category', this.firstFormGroup?.get('category')?.value);
    data.append('amount', this.firstFormGroup?.get('amount')?.value);
    data.append('formattedAddress', this.secondFormGroup.get('formattedAddress')?.value);
    if (this.selectedFile) data.append('img', this.selectedFile, this.selectedFile.name);
    for (let i = 0; i < this.length; i++) {
      data.append('docs', this.docs[i], this.docs[i].name);
    }
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup) {
      this.subscribe.add(this._servicerServices.servicerVerification(data, this.id).subscribe({
        next: (res) => {
          this._router.navigate(['servicer/adminServicerApproval'], { queryParams: { id: res.id } });
        }
      }))
    }
  }
}

