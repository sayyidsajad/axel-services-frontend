import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { Space, WhiteSpace, confirmPasswordValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-servicers-signup',
  templateUrl: './servicers-signup.component.html',
  styleUrls: ['./servicers-signup.component.css']
})
export class ServicersSignupComponent {
  private subscribe: Subscription = new Subscription()
  registerForm!: FormGroup

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      companyName: ['', [Validators.required, WhiteSpace.validate]],
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
  constructor(private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router) { }

  onSubmit() {
    const servicer = this.registerForm.getRawValue();
    if (this.registerForm.valid) {
      this.subscribe.add(this._servicerServices.servicerRegister(servicer.companyName, servicer.email, +servicer.phone, servicer.password, servicer.confirmPassword).subscribe({
        next: (res) => {
          this._router.navigate(['servicer/servicerVerification'], { queryParams: { id: res.id } });
        }
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
