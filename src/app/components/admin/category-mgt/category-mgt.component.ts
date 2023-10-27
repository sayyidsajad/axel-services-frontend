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
  categoryForm!: FormGroup
  categories!: Array<categoryData>;
  displayedColumns: string[] = ['id', 'categoryname', 'description', 'list', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  dialogForm!: FormGroup
  private subscribe: Subscription = new Subscription()
  categoryName!: string;
  description!: string;

  constructor(private _adminServices: AdminService, private _fb: FormBuilder, public _dialog: MatDialog,private _toastr:ToastrService) {
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
      this.subscribe.add(this._adminServices.addCategory(category).subscribe((res) => {
        this.categoryForm.reset()
        Swal.fire('Successfully Added', '', 'success')
        this.listCategories()
      }, (err) => {
        this._toastr.error(err.error.message);
      }))
    }
  }

  listUnlist(id: string) {
    this.subscribe.add(this._adminServices.listUnlist(id).subscribe((res) => {
      this.listCategories()
    }, (err) => {
      this._toastr.error(err.error.message);
    }))
  }

  editCategory(id: string, categoryName: string, description: string) {
    let dialogRef = this._dialog.open(this.callAPIDialog);
    this.dialogForm = this._fb.group({
      categoryName: [categoryName, Validators.required],
      description: [description, Validators.required],
    })
    dialogRef.afterClosed().subscribe(result => {
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
    })
  }

  updateCategory(id: string, categoryName: string, description: string) {
    this.subscribe.add(this._adminServices.updateCategory(id, categoryName, description).subscribe((res) => {
      Swal.fire('Successfully Updated', '', 'success')
      this.listCategories()
    }, (err) => {
      this._toastr.error(err.error.message);
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
    this.subscribe.add(this._adminServices.listCategories().subscribe((res) => {
      this.dataSource = res.categories
    }, (err) => {
      this._toastr.error(err.error.message);
    }))
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}

