import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { Subscription } from 'rxjs';
import { Space, WhiteSpace, confirmPasswordValidator, noNumbersValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm!: FormGroup
  private subscribe: Subscription = new Subscription()
  hide = true
  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', [WhiteSpace.validate, Validators.required,Space.noSpaceAllowed,noNumbersValidator]],
      email: ['', [Space.noSpaceAllowed, Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){0,}@g(oogle)?mail\.com$")]],
      phone: ['', [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]+$/),
      Space.noSpaceAllowed]],
      password: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]]
    }, { validators: confirmPasswordValidator })
  }

  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _router: Router) { }

  onSubmit() {
    const user = this.registerForm.getRawValue();
    if (this.registerForm.valid) {
      this.subscribe.add(this._userServices.userRegister(user.name, user.email, +user.phone, user.password, user.confirmPassword).subscribe({
        next: (res) => {
          this._router.navigate(['otpVerification'], { queryParams: { id: res.id } });
        }
      }))
    }
  }
  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
  
    if (!control || !control.invalid) {
      return '';
    }
  
    const fieldName = this.capitalizeFirstLetter(controlName);
  
    if (control.hasError('required')) {
      return `${fieldName} is required`;
    }
  
    if (control.hasError('whitespace')) {
      return `${fieldName} cannot contain whitespaces`;
    }
  
    if (control.hasError('noSpaceAllowed')) {
      return `${fieldName} cannot contain spaces`;
    }
  
    if (control.hasError('noNumbers')) {
      return `${fieldName} cannot contain numbers`;
    }
  
    if (control.hasError('email')) {
      return `Invalid ${fieldName} format`;
    }
  
    if (controlName === 'name') {
      if (control.hasError('minlength')) {
        return `${fieldName} must be at least 3 characters long`;
      }
  
      if (control.hasError('maxlength')) {
        return `${fieldName} cannot exceed 50 characters`;
      }
    }
  
    if (controlName === 'email') {
      if (control.hasError('pattern')) {
        return `Invalid ${fieldName} format (use a valid Gmail address)`;
      }
    }
  
    if (controlName === 'phone') {
      if (control.hasError('minlength') || control.hasError('maxlength')) {
        return `${fieldName} must be exactly 10 digits long`;
      }
    }
  
    if (controlName === 'password') {
      if (control.hasError('minlength')) {
        return `${fieldName} must be at least 8 characters long`;
      }
    }
  
    if (controlName === 'confirmPassword') {
      if (control.hasError('minlength')) {
        return `${fieldName} must be at least 8 characters long`;
      }
  
      if (control.hasError('PasswordNoMatch')) {
        return 'Passwords do not match';
      }
    }
  
    return `Invalid ${fieldName}`;
  }
  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
