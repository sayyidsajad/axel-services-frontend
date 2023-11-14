import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

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
  firstFormGroup = this._fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._fb.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _fb: FormBuilder,private _toastr:ToastrService) { }

  private fillInAddress!: (place: any) => void;
  private renderAddress!: (place: any) => void;

  ngOnInit() {
  }

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
      map.setCenter(place.geometry.location);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    };
  }
  currentLocation(){
    if(!navigator.geolocation){
      console.log('location is not supported');
      
    }
    navigator.geolocation.getCurrentPosition((position)=>{
    this.getReverseGeocodingData(position.coords.latitude,position.coords.longitude)
    })
  }
  getReverseGeocodingData(lat: number, lng: number) {
    const latlng = new google.maps.LatLng(lat, lng);
    const geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        alert(status);
      }
  
      if (status === google.maps.GeocoderStatus.OK) {
        const place = results[0];
  
        if (place && place.formatted_address) {
          this.renderAddress(place);
          this.fillInAddress(place);
        } else {
          // Handle the case where the formatted_address is not available
          this._toastr.error('No address details available for the location.');
        }
      }
    });
  }
  onStepChange(event: any) {
    if (event.selectedIndex === 1) { // Adjust the index based on your step order
      // Initialize the map
      this.initMap();
    }
  }
  
}

