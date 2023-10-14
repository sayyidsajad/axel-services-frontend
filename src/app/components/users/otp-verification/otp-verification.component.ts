import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  message!: string
  email!: string;
  token!:string
  constructor(private fb: FormBuilder, private userServices: UsersService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.email = params['email']
      }
      );
    this.sendMail(this.email)
    this.otpVerification = this.fb.group({
      otpCode: ['', Validators.required],
    })
  }
  sendMail(email: string) {
    this.userServices.sendMail(email).subscribe((res) => {
      this.otp = res.otp
      this.token = res.access_token.toString()
    }, (err) => {
      if (err.status) {
        this.message = err.error.message
      }
    })
  }
  resendOtp() {
    this.sendMail(this.email)
  }
  verifyOtp() {
    const user = this.otpVerification.getRawValue();    
    if (this.otpVerification.valid && +this.otp === +user.otpCode) {      
      this.verified = true
      this.userServices.loadHome().subscribe((res) => {                   
        localStorage.setItem('userSecret', this.token)
        this.router.navigate(['home']);
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
