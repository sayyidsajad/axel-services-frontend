import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
bannerForm!:FormGroup
constructor(private _fb: FormBuilder, private _toastr: ToastrService) {
}
}
