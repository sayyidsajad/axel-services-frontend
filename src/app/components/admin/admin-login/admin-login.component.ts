import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm!: FormGroup;
  submit: boolean = false
  message!: string;
  constructor(private fb: FormBuilder, private adminServices: AdminService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  onSubmit() {
    this.submit = true
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.adminServices.adminLogin(user).subscribe((res) => {
        localStorage.setItem('adminSecret', res.access_token.toString());
        this.router.navigate(['admin/dashboard']);
        this.toastr.success('LoggedIn Successfully', 'Axel Services');
      }, (err) => {
        if (err.status) {
          this.submit = false
          this.message = err.error.message
        }
      })
    }
  }
}
