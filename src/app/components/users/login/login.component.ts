import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Space } from '../../validators/custom-validators';
import { environment } from 'src/environments/environment.development';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submit: boolean = false
  loginForm!: FormGroup
  private subscribe: Subscription = new Subscription()
  loggedIn!: boolean;
  hide = true
  ngOnInit(): void {
    this._authService.authState.subscribe({
      next: (user) => {
        this.googleLogin(user)
      }
    });
    this.loginForm = this._fb.group({
      email: ['', [Space.noSpaceAllowed, Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){0,}@g(oogle)?mail\.com$")]],
      password: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]],
    })
  }

  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _authService: SocialAuthService) { }
  onSubmit() {
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.subscribe.add(this._userServices.userLogin(user).subscribe({
        next: (res) => {
          if (res.verified === false) {
            this._router.navigate(['otpVerification'], { queryParams: { id: res.id } });
          } else {
            localStorage.setItem(environment.userSecret, res.access_token.toString());
            this._toastr.success('LoggedIn Successfully', 'Axel Services');
            this._router.navigate(['home']);
          }
        }
      }))
    }
  }
  googleLogin(user: SocialUser) {
    this._userServices.userGoogleLogin(user).subscribe({
      next: (res) => {
        localStorage.setItem(environment.userSecret, res.access_token.toString());
        this._toastr.success('LoggedIn Successfully', 'Axel Services');
        this._router.navigate(['home']);
      }
    })
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
