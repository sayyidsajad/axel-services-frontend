import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { Subscription } from 'rxjs';
import { UserRegister } from 'src/app/services/users/types/user-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  submit: boolean = false
  googleUser!: SocialUser;
  googleAuth: boolean = false
  registerForm!: FormGroup
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {
      this.googleUser = user
      // if (this.googleUser !== null) {
      //   this.googleSignIn(this.googleUser)
      // }
    })

    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(8)]]
    })
  }
  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _authService: SocialAuthService) { }
  // googleSignIn(user: SocialUser) {
  //   this.userServices.userRegister(user).subscribe((res) => {
  //     this.router.navigate(['home']);
  //     this.toastr.success('Registered Successfully', 'Axel Services');
  //   })
  // }

  onSubmit() {
    const user = this.registerForm.getRawValue();
    if (this.registerForm.valid) {
      this.subscribe.add(this._userServices.userRegister(user.name,user.email,+user.phone,user.password,user.confirmPassword).subscribe((res) => {
        this._router.navigate(['otpVerification'], { queryParams: { email: res.email } });
      }, (err) => {
        this._toastr.error(err.error.message);          
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
