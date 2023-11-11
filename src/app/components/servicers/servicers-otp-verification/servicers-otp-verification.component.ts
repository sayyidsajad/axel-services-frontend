import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { Space } from '../../validators/custom-validators';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-servicers-otp-verification',
  templateUrl: './servicers-otp-verification.component.html',
  styleUrls: ['./servicers-otp-verification.component.css']
})
export class ServicersOtpVerificationComponent {
  otpVerification!: FormGroup
  id!: string
  otp!: string
  verified: boolean = false
  count: number = 10
  resendActive: boolean = false;
  resendCount: number = 0
  private subscribe: Subscription = new Subscription()

  constructor(private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router, private _toastr: ToastrService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscribe.add(
      this._route.queryParams
        .subscribe({
          next: (params) => {
            this.id = params['id']
          }, error: (err) => {
            this._toastr.error(err.error.message);
          }
        })
    )
    this.timer()
    this.sendMail(this.id)
    this.otpVerification = this._fb.group({
      otpCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[0-9]+$/),
      Space.noSpaceAllowed]],
    })
  }

  sendMail(id: string) {
    this.subscribe.add(this._servicerServices.sendMail(id).subscribe({
      next: (res) => {
        this.otp = res.otp
      }, error: (err) => {
        this._toastr.error(err.error.message);
      }
    }))
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

  verifyOtp() {
    const user = this.otpVerification.getRawValue();
    if (this.otpVerification.valid && +this.otp === +user.otpCode) {
      this.verified = true
      this.subscribe.add(this._servicerServices.servicerDashboard(this.id).subscribe({
        next: (res) => {
          localStorage.setItem(environment.servicerSecret, res.access_token.toString())
          this._router.navigate(['servicer/main/dashboard']);
        }, error: (err) => {
          this.verified = false
          this._toastr.error(err.error.message);
        }
      }))
    } else {
      this._toastr.error('Invalid OTP');
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
