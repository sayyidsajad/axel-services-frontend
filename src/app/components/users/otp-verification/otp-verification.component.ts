import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { Space } from '../../validators/custom-validators';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  verified: boolean = false
  otpVerification!: FormGroup
  otp!: number;
  id!: string;
  token!: string
  count: number = 10
  resendActive: boolean = false;
  resendCount: number = 0
  private subscribe: Subscription = new Subscription()

  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscribe.add(this._route.queryParams
      .subscribe({
        next: (params) => {
          this.id = params['id']
        }
      }))
    this.timer()
    this.sendMail(this.id)
    this.otpVerification = this._fb.group({
      otpCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[0-9]+$/),
      Space.noSpaceAllowed]],
    })
  }
  sendMail(id: string) {
    this.subscribe.add(this._userServices.sendMail(id).subscribe({
      next: (res) => {
        this.otp = +res.otp
        this.token = res.access_token.toString()
      }
    }))
  }
  timer() {
    const time = setInterval(() => {
      this.count--
      if (this.count === 0) {
        this.count = 10
        this.resendActive = true
        clearInterval(time)
      }
    }, 2000)
  }
  resendOtp() {
    if (this.resendCount === 3) {
      this._toastr.error('Resend OTP limit has been expired, You will be redirected to login page, please try again.');
      setTimeout(() => {
        this._router.navigate(['/']);
      }, 5000)
    }
    if (this.resendActive === true)
      this.resendCount++
    this.sendMail(this.id)
    this.timer()
    this.resendActive = false
  }
  verifyOtp() {
    const user = this.otpVerification.getRawValue();
    if (this.otpVerification.valid && +this.otp === +user.otpCode) {
      this.verified = true
      this.subscribe.add(this._userServices.loadHome(this.id).subscribe({
        next: () => {
          localStorage.setItem(environment.userSecret, this.token)
          this._router.navigate(['home']);
        }, error: () => {
          this.verified = false
        },
        complete: () => {
          this._toastr.success('Registered Successfully', 'Axel Services');
        }
      }))
    } else {
      this._toastr.error('Invalid OTP', 'Axel Services');
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
