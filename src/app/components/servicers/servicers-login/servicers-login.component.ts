import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

@Component({
  selector: 'app-servicers-login',
  templateUrl: './servicers-login.component.html',
  styleUrls: ['./servicers-login.component.css']
})
export class ServicersLoginComponent {
  loginForm!: FormGroup
  message!: string;
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  constructor(private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router, private _toastr: ToastrService) { }

  onSubmit() {
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.subscribe.add(
        this._servicerServices.servicerLogin(user).subscribe((res) => {
          if (res.isApproved === true && res.isVerified === true) {
            localStorage.setItem('servicerSecret', res.access_token.toString())
            this._router.navigate(['servicer/main/dashboard']);
            this._toastr.success('Logged in successfully', 'Axel Services');
          } else {
            this._router.navigate(['servicer/servicerOtpVerification'], { queryParams: { id: res.id } });
          }
        }, (err) => {
          this._toastr.error(err.error.message);
        }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
