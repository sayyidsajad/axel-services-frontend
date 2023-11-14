import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { categoryData } from '../../admin/category-mgt/types/categories.types';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Space, WhiteSpace } from '../../validators/custom-validators';

@Component({
  selector: 'app-servicer-procedures',
  templateUrl: './servicer-procedures.component.html',
  styleUrls: ['./servicer-procedures.component.css']
})
export class ServicerProceduresComponent {
  selectedFile!: File
  submit: boolean = false
  verificationForm!: FormGroup;
  id!: string
  categories!: Array<categoryData>;
  private subscribe: Subscription = new Subscription()

  constructor(private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
    
        // Use reverse geocoding to get the city name
        const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyATwe8K9Zc1QMy4EY0_vW9Gch6oOW90NcI`;

        fetch(geocodingApiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            if (data.results && data.results.length > 0) {
              const addressComponents = data.results[0].address_components;
              const city = addressComponents.find((component: { types: string | string[]; }) => component.types.includes('locality'));
        
              if (city) {
                console.log(`City: ${city.long_name}`);
              } else {
                console.log('City not found in address components');
              }
            } else {
              console.log('No results from reverse geocoding');
            }
          })
          .catch(error => {
            console.error('Error fetching reverse geocoding data', error);
          });
        
      });
    }
    
    this.subscribe.add(this._route.queryParams
      .subscribe({
        next: (params) => {
          this.id = params['id']
        }
      }))
    this.verificationForm = this._fb.group({
      serviceName: ['', [Validators.required, WhiteSpace.validate]],
      description: ['', [Validators.required, WhiteSpace.validate]],
      category: ['', Validators.required],
      amount: ['', [Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Space.noSpaceAllowed]],
      img: ['', Validators.required],
    })
    this.categoriesList()
  }
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }

  categoriesList() {
    this.subscribe.add(
      this._servicerServices.categoriesList().subscribe({
        next: (res) => {
          this.categories = res.categories
        }
      }))
  }

  verifyService() {
    const data = new FormData()    
    data.append('serviceName', this.verificationForm?.get('serviceName')?.value);
    data.append('description', this.verificationForm?.get('description')?.value);
    data.append('category', this.verificationForm?.get('category')?.value);
    data.append('amount', this.verificationForm?.get('amount')?.value);
    data.append('img', this.selectedFile, this.selectedFile.name);
    if (this.verificationForm.valid) {
      this.subscribe.add(this._servicerServices.servicerVerification(data, this.id).subscribe({
        next: (res) => {
          this._router.navigate(['servicer/adminServicerApproval'], { queryParams: { id: res.id } });
        }
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
