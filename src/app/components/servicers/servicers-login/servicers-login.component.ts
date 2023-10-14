import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

@Component({
  selector: 'app-servicers-login',
  templateUrl: './servicers-login.component.html',
  styleUrls: ['./servicers-login.component.css']
})
export class ServicersLoginComponent {
  submit: boolean = false
  loginForm!: FormGroup
  message!: string;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  constructor(private fb: FormBuilder, private servicerServices: ServicerService, private router: Router, private toastr: ToastrService) { }
  onSubmit() {
    this.submit = true
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.servicerServices.servicerLogin(user).subscribe((res) => {
        if (res.isApproved === true && res.isVerified === true) {
          this.router.navigate(['servicer/servicerDashboard']);
          this.toastr.success('Registered Successfully', 'Axel Services');
        } else {
          this.router.navigate(['servicer/servicerOtpVerification'], { queryParams: { id: res.id } });
        }
      }, (err) => {
        if (err.status) {
          this.submit = false
          this.message = err.error.message
        }
      })
    }
  }
}
