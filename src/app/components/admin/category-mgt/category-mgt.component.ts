import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { categoryData } from './types/categories.types';

@Component({
  selector: 'app-category-mgt',
  templateUrl: './category-mgt.component.html',
  styleUrls: ['./category-mgt.component.css']
})
export class CategoryMgtComponent {
  categoryForm!: FormGroup
  message!: string
  categories!: Array<categoryData>;
  constructor(private adminServices: AdminService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.listCategories()
  }
  onSubmit() {
    const category = this.categoryForm.getRawValue();
    if (this.categoryForm.valid) {
      this.adminServices.addCategory(category).subscribe((res) => {
        this.ngOnInit()
      }, (err) => {
        if (err.status) {
          this.message = err.error.message
        }
      })
    }
  }
  listCategories() {
    this.adminServices.listCategories().subscribe((res) => {
      this.categories = res.categories
    }, (err) => {
      if (err.status) {
        this.message = err.error.message
      }
    })
  }
}
