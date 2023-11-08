import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Space } from '../../validators/custom-validators';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  private subscribe: Subscription = new Subscription()
  loginForm!: FormGroup;
  message!: string;

  constructor(private _fb: FormBuilder, private _adminServices: AdminService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Space.noSpaceAllowed, Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$")]],
      password: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]],
    })
  }

  onSubmit() {
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.subscribe.add(this._adminServices.adminLogin(user).subscribe((res) => {
        localStorage.setItem('adminSecret', res.access_token.toString());
        this._router.navigate(['admin/main/dashboard']);
        this._toastr.success('LoggedIn Successfully', 'Axel Services');
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
