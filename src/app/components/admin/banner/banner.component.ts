import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Space, WhiteSpace, noNumbersValidator } from '../../validators/custom-validators';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

export interface BannerData {
  bannerName: string;
  description: string;
  image: Array<string>;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  docs: File[] = [];
  private subscribe: Subscription = new Subscription()
  length!: number;
  selectedFile!: File
  bannerForm!: FormGroup
  displayedColumns: string[] = ['bannerName', 'description', 'image'];
  dataSource!: MatTableDataSource<BannerData>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _fb: FormBuilder, private _toastr: ToastrService, private _adminServices: AdminService) {
    this.bannerForm = this._fb.group({
      bannerName: ['', [Validators.required, WhiteSpace.validate, Space.noSpaceAllowed, , noNumbersValidator]],
      description: ['', [Validators.required, WhiteSpace.validate, Space.noSpaceAllowed, noNumbersValidator]],
      images: ['', Validators.required],
    })
    this.dataSource = new MatTableDataSource();
    this.listBanners()
  }
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      this.docs = Array.from(inputElement.files);
      this.length = this.docs.length;
    }
  }
  bannerSubmit() {
    if (this.bannerForm.valid) {
      const data = new FormData()
      data.append('bannerName', this.bannerForm?.get('bannerName')?.value);
      data.append('description', this.bannerForm?.get('description')?.value);
      for (let i = 0; i < this.length; i++) {
        data.append('images', this.docs[i], this.docs[i].name);
      }
      this.subscribe.add(this._adminServices.createBanner(data).subscribe({
        next: () => {
          this.bannerForm.reset()
          this.listBanners()
        },
        complete: () => {
          Swal.fire('Successfully Added', '', 'success')
        }
      }))
    } else {
      this._toastr.error('Invalid Form Details')
    }
  }
  getErrorMessage(controlName: string): string {
    const control = this.bannerForm.get(controlName);
    if (!control || !control.invalid) {
      return '';
    }
    if (control.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control.hasError('noSpaceAllowed')) {
      return 'Spaces not allowed';
    }
    if (control.hasError('whitespace')) {
      return 'White Spaces Not Allowed';
    }
    if (control.hasError('noNumbers')) {
      return 'Numbers Not Allowed';
    }
    return 'Invalid input';
  }

  listBanners() {
    this.subscribe.add(this._adminServices.listBanners().subscribe({
      next: (res) => {
        this.dataSource.data = res.banners
      }
    }))
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
