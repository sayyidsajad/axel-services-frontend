import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  verified: boolean = false
  otpVerification!: FormGroup
  otp!: number;
  email!: string;
  token!: string
  count: number = 10
  resendActive: boolean = false;
  resendCount: number = 0
  private subscribe: Subscription = new Subscription()

  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscribe.add(this._route.queryParams
      .subscribe(params => {
        this.email = params['email']
      }
      ))
    this.timer()
    this.sendMail(this.email)
    this.otpVerification = this._fb.group({
      otpCode: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
    })
  }

  sendMail(email: string) {
    this.subscribe.add(this._userServices.sendMail(email).subscribe((res) => {
      this.otp = res.otp
      this.token = res.access_token.toString()
    }, (err) => {
      this._toastr.error(err.error.message);
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
    this.sendMail(this.email)
    this.timer()
    this.resendActive = false
  }

  verifyOtp() {
    const user = this.otpVerification.getRawValue();
    if (this.otpVerification.valid && +this.otp === +user.otpCode) {
      this.verified = true
      this.subscribe.add(this._userServices.loadHome().subscribe((res) => {
        localStorage.setItem('userSecret', this.token)
        this._toastr.success('Registered Successfully', 'Axel Services');
        this._router.navigate(['home']);
      }, (err) => {
          this.verified = false
          this._toastr.error(err.error.message);
      }))
    } else {
      this._toastr.error('Invalid OTP','Axel Services');
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
