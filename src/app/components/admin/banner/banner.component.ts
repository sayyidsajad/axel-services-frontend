import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  bannerForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _toastr: ToastrService) {
}
ngOnInit(): void {
  this.bannerForm = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
}
onSubmit(){

}
}
