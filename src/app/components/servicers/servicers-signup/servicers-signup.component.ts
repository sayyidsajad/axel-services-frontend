import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

@Component({
  selector: 'app-servicers-signup',
  templateUrl: './servicers-signup.component.html',
  styleUrls: ['./servicers-signup.component.css']
})
export class ServicersSignupComponent {
  submit: boolean = false
  message!: string;
  registerForm!: FormGroup
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }
  constructor(private fb: FormBuilder, private servicerServices: ServicerService, private router: Router, private toastr: ToastrService) { }
  onSubmit() {
    this.submit = true
    const user = this.registerForm.getRawValue();
    if (this.registerForm.valid) {
      this.servicerServices.servicerRegister(user).subscribe((res) => {
        this.router.navigate(['servicer/procedures'], { queryParams: { id: res.id } });
      }, (err) => {
        if (err.status) {
          this.submit = false
          this.message = err.error.message
        }
      })
    }
  }
}
