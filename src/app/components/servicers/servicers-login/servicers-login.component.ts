import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { Space } from '../../validators/custom-validators';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicers-login',
  templateUrl: './servicers-login.component.html',
  styleUrls: ['./servicers-login.component.css']
})
export class ServicersLoginComponent {
  loginForm!: FormGroup
  message!: string;
  hide = true
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Space.noSpaceAllowed, Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){0,}@g(oogle)?mail\.com$")]],
      password: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]],
    })
  }

  constructor(private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router, private _toastr: ToastrService) { }

  onSubmit() {
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.subscribe.add(
        this._servicerServices.servicerLogin(user).subscribe({
          next: (res) => {
            if (res.isApproved === true && res.isVerified === true) {
              localStorage.setItem(environment.servicerSecret, res.access_token.toString())
              this._router.navigate(['servicer/main/dashboard']);
            } else {
              this._router.navigate(['servicer/servicerOtpVerification'], { queryParams: { id: res.id } });
            }
          },
          complete: () => {
            this._toastr.success('Logged in successfully', 'Axel Services');
          }
        }))
    }
  }
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.invalid) {
      return '';
    }
    if (control.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control.hasError('noSpaceAllowed')) {
      return 'Spaces not allowed';
    }
    if (control.hasError('whitespace')) {
      return 'White Spaces Not Allowed';
    }
    if (control.hasError('noNumbers')) {
      return 'Numbers Not Allowed';
    }
    if (control.hasError('email')) {
      return 'Invalid Email';
    }
    if (controlName === 'password') {
      if (control.hasError('minlength')) {
        return 'Password must be at least 8 characters long';
      }
    }
    return 'Invalid Email';
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
