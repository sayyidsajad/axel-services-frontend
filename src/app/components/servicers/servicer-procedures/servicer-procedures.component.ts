import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { categoryData } from '../../admin/category-mgt/types/categories.types';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicer-procedures',
  templateUrl: './servicer-procedures.component.html',
  styleUrls: ['./servicer-procedures.component.css']
})
export class ServicerProceduresComponent {
  submit: boolean = false
  verificationForm!: FormGroup;
  id!: string
  categories!: Array<categoryData>;
  private subscribe: Subscription = new Subscription()

  constructor(private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router, private _route: ActivatedRoute, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.subscribe.add(this._route.queryParams
      .subscribe(params => {
        this.id = params['id']
      }
      ))
    this.verificationForm = this._fb.group({
      serviceName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      file: ['', Validators.required],
    })
    this.categoriesList()
  }

  categoriesList() {
    this.subscribe.add(
      this._servicerServices.categoriesList().subscribe((res) => {
        this.categories = res.categories
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
  }

  verifyService() {
    const servicer = this.verificationForm.getRawValue();
    if (this.verificationForm.valid) {
      this.subscribe.add(this._servicerServices.servicerVerification(servicer.serviceName, servicer.description, +servicer.amount, servicer.category, servicer.file, this.id).subscribe((res) => {
        this._router.navigate(['servicer/adminServicerApproval'], { queryParams: { id: res.id } });
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
