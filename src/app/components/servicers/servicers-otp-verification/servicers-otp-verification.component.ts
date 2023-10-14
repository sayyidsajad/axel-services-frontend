import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

@Component({
  selector: 'app-servicers-otp-verification',
  templateUrl: './servicers-otp-verification.component.html',
  styleUrls: ['./servicers-otp-verification.component.css']
})
export class ServicersOtpVerificationComponent {
  otpVerification!:FormGroup
  message!:string
  id!:string
  otp!:string
  verified:boolean = false
  constructor(private fb: FormBuilder, private servicerServices: ServicerService, private router: Router, private toastr: ToastrService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id']
      }
      );
    this.sendMail(this.id)
    this.otpVerification = this.fb.group({
      otpCode: ['', Validators.required],
    })
  }
  sendMail(id: string) {
    this.servicerServices.sendMail(id).subscribe((res) => {
      this.otp = res.otp
    }, (err) => {
      if (err.status) {
        this.message = err.error.message
      }
    })
  }
  resendOtp() {
    this.sendMail(this.id)
  }
  verifyOtp() {
    const user = this.otpVerification.getRawValue();
    if (this.otpVerification.valid && +this.otp === +user.otpCode) {
      this.verified = true
      this.servicerServices.servicerDashboard(this.id).subscribe((res) => {        
        // localStorage.setItem('servicerSecret', res.access_token.toString())
        this.router.navigate(['servicer/servicerDashboard']);
      }, (err) => {
        if (err.status) {
          this.verified = false
          this.message = err.error.message
        }
      })
    } else {
      this.message = 'Invalid OTP'
    }
  }
}
