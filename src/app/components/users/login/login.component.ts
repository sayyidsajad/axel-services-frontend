import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submit: boolean = false
  loginForm!: FormGroup
  message!: string;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  constructor(private fb: FormBuilder, private userServices: UsersService, private router: Router, private toastr: ToastrService) { }
  onSubmit() {
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.submit = true
      this.userServices.userLogin(user).subscribe((res) => {        
        localStorage.setItem('userSecret', res.access_token.toString());
        this.router.navigate(['home']);
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
