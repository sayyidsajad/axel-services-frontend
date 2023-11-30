import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { categoryData } from './types/categories.types';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-mgt',
  templateUrl: './category-mgt.component.html',
  styleUrls: ['./category-mgt.component.css']
})
export class CategoryMgtComponent {
  displayedColumns: string[] = ['id', 'categoryname', 'description', 'list', 'action'];
  private subscribe: Subscription = new Subscription()
  dataSource: MatTableDataSource<any>;
  categories!: Array<categoryData>;
  callAPIDialog!: TemplateRef<any>;
  categoryForm!: FormGroup
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('callAPIDialog')
  dialogForm!: FormGroup
  categoryName!: string;
  description!: string;

  constructor(private _adminServices: AdminService, private _fb: FormBuilder, public _dialog: MatDialog, private _toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.listCategories()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    const category = this.categoryForm.getRawValue();
    if (this.categoryForm.valid) {
      this.subscribe.add(this._adminServices.addCategory(category.categoryName, category.description).subscribe({
        next: (res) => {
          this.categoryForm.reset()
          this.listCategories()
        }, complete: () => {
          Swal.fire('Successfully Added', '', 'success')
        }
      }))
    }
  }

  listUnlist(id: string) {
    this.subscribe.add(this._adminServices.listUnlist(id).subscribe({
      next: (res) => {
        this.listCategories()
        res.message === 'Listed' ? this._toastr.success('Category has been listed') : this._toastr.warning('Category has been unlisted')
      }
    }))
  }
  editCategory(id: string, categoryName: string, description: string) {
    const dialogRef = this._dialog.open(this.callAPIDialog);
    this.dialogForm = this._fb.group({
      categoryName: [categoryName, Validators.required],
      description: [description, Validators.required],
    })
    this.subscribe.add(dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result !== undefined) {
          if (result === 'yes') {
            const categ = this.dialogForm.getRawValue();
            if (categ.categoryName !== '' && categ.description !== '') {
              this.updateCategory(id, categ.categoryName, categ.description)
            } else {
              this._toastr.error('Both fields are required.');
              this.updateCategory(id, categoryName, description)
            }
          }
        }
      }
    }))
  }

  updateCategory(id: string, categoryName: string, description: string) {
    this.subscribe.add(this._adminServices.updateCategory(id, categoryName, description).subscribe({
      next: () => {
        this.listCategories()
      },
      complete: () => {
        Swal.fire('Successfully Updated', '', 'success')
      }
    }))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listCategories() {
    this.subscribe.add(this._adminServices.listCategories().subscribe({
      next: (res) => {
        this.dataSource = res.categories
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}

