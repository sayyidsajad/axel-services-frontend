import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WhiteSpace } from '../../validators/custom-validators';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  aboutUs!: FormGroup;
  private subscribe: Subscription = new Subscription()
  ngOnInit(): void {
    this.aboutUs = this._fb.group({
      firstName: ['', [Validators.required, WhiteSpace.validate]],
      lastName: ['', [Validators.required, WhiteSpace.validate]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){0,}@g(oogle)?mail\.com$")]],
      message: ['', [Validators.required, WhiteSpace.validate]],
    });
  }
  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _toastr: ToastrService) { }
  onSubmit() {
    const enquiry = this.aboutUs.getRawValue();
    if (this.aboutUs.valid) {
      this.subscribe.add(this._userServices.userEnquiry(enquiry.firstName, enquiry.lastName, enquiry.email, enquiry.message).subscribe({
        complete: () => {
          this._toastr.success('Your priority has been noticed.', 'Axel Services');
        }
      }))
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
