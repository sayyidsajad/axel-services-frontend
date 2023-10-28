import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

@Component({
  selector: 'app-servicers-signup',
  templateUrl: './servicers-signup.component.html',
  styleUrls: ['./servicers-signup.component.css']
})
export class ServicersSignupComponent {
  registerForm!: FormGroup
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]]
    })
  }
  constructor(private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router, private _toastr: ToastrService) { }
  onSubmit() {
    const servicer = this.registerForm.getRawValue();    
    if (this.registerForm.valid) {
      this.subscribe.add(this._servicerServices.servicerRegister(servicer.companyName,servicer.email,+servicer.phone,servicer.password,servicer.confirmPassword).subscribe((res) => {
        this._router.navigate(['servicer/servicerProcedures'], { queryParams: { id: res.id } });
      }, (err) => {
        console.log(err);
        
        this._toastr.error(err.error.message);
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
