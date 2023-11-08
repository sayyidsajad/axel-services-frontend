import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { Space } from '../../validators/custom-validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  resetForm!: FormGroup
  private subscribe: Subscription = new Subscription()

  constructor(private _fb: FormBuilder, private _toastr: ToastrService, private _userServices: UsersService, private _router: Router) { }

  ngOnInit(): void {
    this.resetForm = this._fb.group({
      email: ['',  [Space.noSpaceAllowed, Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$")]],
    })
  }
  onSubmit() {
    const reset = this.resetForm.getRawValue()
    if (this.resetForm.valid) {
      this.subscribe.add(this._userServices.forgotPassword(reset.email).subscribe((res) => {
        this._toastr.success('Resend link has been sent to your mail.');
        this._router.navigate(['/']);
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
    }
  }
  
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
