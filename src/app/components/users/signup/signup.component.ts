import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";

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
  message!: string;
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.googleUser = user
      if (this.googleUser !== null) {
        this.googleSignIn(this.googleUser)
      }
    })
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }
  constructor(private fb: FormBuilder, private userServices: UsersService, private router: Router, private toastr: ToastrService, private authService: SocialAuthService) { }
  googleSignIn(user: SocialUser) {
    this.userServices.userRegister(user).subscribe((res) => {
      this.router.navigate(['home']);
      this.toastr.success('Registered Successfully', 'Axel Services');
    })
  }
  onSubmit() {
    this.submit = true
    const user = this.registerForm.getRawValue();
    if (this.registerForm.valid) {
      this.userServices.userRegister(user).subscribe((res) => {
        this.router.navigate(['otpVerification'], { queryParams: { email: res.email } });
      }, (err) => {
        if (err.status) {
          if (err.status) {
            this.submit = false
            this.message = err.error.message
          }
        }
      })
    }
  }
}
