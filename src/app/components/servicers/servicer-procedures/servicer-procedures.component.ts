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
  selectedFile!: File
  submit: boolean = false
  verificationForm!: FormGroup;
  id!: string
  categories!: Array<categoryData>;
  private subscribe: Subscription = new Subscription()

  constructor(private _fb: FormBuilder, private _servicerServices: ServicerService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscribe.add(this._route.queryParams
      .subscribe({
        next: (params) => {
          this.id = params['id']
        }
      }))
    this.verificationForm = this._fb.group({
      serviceName: ['', [Validators.required, WhiteSpace.validate]],
      description: ['', [Validators.required, WhiteSpace.validate]],
      category: ['', Validators.required],
      amount: ['', [Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Space.noSpaceAllowed]],
      img: ['', Validators.required],
    })
    this.categoriesList()
  }
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }

  categoriesList() {
    this.subscribe.add(
      this._servicerServices.categoriesList().subscribe({
        next: (res) => {
          this.categories = res.categories
        }
      }))
  }

  verifyService() {    
    const data = new FormData()    
    data.append('serviceName', this.verificationForm?.get('serviceName')?.value);
    data.append('description', this.verificationForm?.get('description')?.value);
    data.append('category', this.verificationForm?.get('category')?.value);
    data.append('amount', this.verificationForm?.get('amount')?.value);
    data.append('img', this.selectedFile, this.selectedFile.name);
    if (this.verificationForm.valid) {
      this.subscribe.add(this._servicerServices.servicerVerification(data, this.id).subscribe({
        next: (res) => {
          this._router.navigate(['servicer/adminServicerApproval'], { queryParams: { id: res.id } });
        }
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
