import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { categoryData } from '../../admin/category-mgt/types/categories.types';

@Component({
  selector: 'app-servicer-procedures',
  templateUrl: './servicer-procedures.component.html',
  styleUrls: ['./servicer-procedures.component.css']
})
export class ServicerProceduresComponent {
  submit: boolean = false
  verificationForm!: FormGroup;
  message!: string;
  id!: number
  categories!: Array<categoryData>;
  constructor(private fb: FormBuilder, private servicerServices: ServicerService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id']
      }
      );
    this.verificationForm = this.fb.group({
      serviceName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      file: ['', Validators.required],
    })
    this.categoriesList()
  }
  categoriesList() {
    this.servicerServices.categoriesList().subscribe((res) => {
      this.categories = res.categories
    }, (err) => {
      if (err.status) {
        this.submit = false
        this.message = err.error.message
      }
    })
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.verificationForm.patchValue({
        fileSource: file
      });
    }
  }


  verifyService() {
    const user = this.verificationForm.getRawValue();
    this.submit = true
    if (this.verificationForm.valid) {
      this.servicerServices.servicerVerification(user, this.id).subscribe((res) => {
        this.router.navigate(['servicer/adminServicerApproval'], { queryParams: { id: res.id } });
      }, (err) => {
        if (err.status) {
          this.submit = false
          this.message = err.error.message
        }
      })
    }
  }

}
