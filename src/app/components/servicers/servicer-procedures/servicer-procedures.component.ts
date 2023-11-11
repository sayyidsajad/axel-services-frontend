import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { categoryData } from '../../admin/category-mgt/types/categories.types';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Space, WhiteSpace } from '../../validators/custom-validators';

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
      .subscribe({
        next: (params) => {
          this.id = params['id']
        }, error: (err) => {
          this._toastr.error(err.error.message);
        }
      }))
    this.verificationForm = this._fb.group({
      serviceName: ['', [Validators.required, WhiteSpace.validate]],
      description: ['', [Validators.required, WhiteSpace.validate]],
      category: ['', Validators.required],
      amount: ['', [Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Space.noSpaceAllowed]],
      file: ['', Validators.required],
    })
    this.categoriesList()
  }

  categoriesList() {
    this.subscribe.add(
      this._servicerServices.categoriesList().subscribe({
        next: (res) => {
          this.categories = res.categories
        }, error: (err) => {
          this._toastr.error(err.error.message);
        }
      }))
  }

  verifyService() {
    const servicer = this.verificationForm.getRawValue();
    if (this.verificationForm.valid) {
      this.subscribe.add(this._servicerServices.servicerVerification(servicer.serviceName, servicer.description, +servicer.amount, servicer.category, servicer.file, this.id).subscribe({
        next: (res) => {
          this._router.navigate(['servicer/adminServicerApproval'], { queryParams: { id: res.id } });
        }, error: (err) => {
          this._toastr.error(err.error.message);
        }
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
