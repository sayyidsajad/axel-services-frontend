import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPassForm!: FormGroup
  id!: string
  private subscribe: Subscription = new Subscription()
  tryCount: number = 0
  ngOnInit(): void {
    this.subscribe.add(this._route.queryParams
      .subscribe(params => {
        this.id = params['id']
      }
      ))
    this.resetPassForm = this._fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newConfirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _route: ActivatedRoute, private _toastr: ToastrService, private _router: Router) { }

  onSubmit() {
    const resetForm = this.resetPassForm.getRawValue();
    if (this.tryCount < 4) {
      if (this.resetPassForm.valid) {
        this.tryCount++
        this.subscribe.add(this._userServices.verifyConfirmPassword(this.id, resetForm.newPassword, resetForm.newConfirmPassword).subscribe((res) => {
          this._toastr.success('Password has been successfully changed');
          this._router.navigate(['/']);
        }, (err) => {
          this._toastr.error(err.error.message);
        }))
      }
    } else {
      this._toastr.error('Your try limit has been exceeded, Please resend your email again');
      this._router.navigate(['forgotPassword'])
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
