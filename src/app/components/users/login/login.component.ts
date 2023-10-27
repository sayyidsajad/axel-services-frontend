import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submit: boolean = false
  loginForm!: FormGroup
  private subscribe: Subscription = new Subscription()
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    })
  }

  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _router: Router, private _toastr: ToastrService) { }

  onSubmit() {
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.subscribe.add(this._userServices.userLogin(user).subscribe((res) => {
        localStorage.setItem('userSecret', res.access_token.toString());
        this._router.navigate(['home']);
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
