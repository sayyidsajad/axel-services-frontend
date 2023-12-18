import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-additional-services',
  templateUrl: './additional-services.component.html',
  styleUrls: ['./additional-services.component.css']
})

export class AdditionalServicesComponent {
  selectedImage: SafeUrl | null = null;
  @ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>;
  dialogForm!: FormGroup;
  private subscribe: Subscription = new Subscription();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['image', 'id', 'service', 'description', 'amount', 'list', 'action'];
  categoryName!: string;
  description!: string;
  selectedFile: File | null = null;
  additionalServices!: FormGroup;

  constructor(private _sanitizer: DomSanitizer, private _servicerServices: ServicerService, private _fb: FormBuilder, public _dialog: MatDialog, private _toastr: ToastrService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.additionalServicesList();
    this.additionalServices = this._fb.group({
      service: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      image: [null]
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    if (this.additionalServices.valid && this.selectedFile) {
      const data = new FormData();
      data.append('service', this.additionalServices.get('service')?.value);
      data.append('description', this.additionalServices.get('description')?.value);
      data.append('amount', this.additionalServices.get('amount')?.value);
      data.append('image', this.selectedFile, this.selectedFile.name);
      this.subscribe.add(this._servicerServices.createService(data).subscribe({
        next: () => {
          this.additionalServices.reset();
          this.selectedImage = null;
          this.selectedFile = null;
          this.additionalServicesList();
        },
        complete: () => {
          Swal.fire('Successfully Added', '', 'success');
        }
      }));
    } else {
      this._toastr.error('Invalid Form Details');
    }
  }

  listUnlist(id: string) {
    this.subscribe.add(this._servicerServices.listUnlist(id).subscribe({
      next: (res) => {
        this.additionalServicesList()
        res.message === 'Listed' ? this._toastr.success('Service has been listed') : this._toastr.warning('Service has been unlisted')
      }
    }))
  }
  editCategory(id: string, service: string, description: string, amount: string, image: any) {
    if (image) {
      this.selectedImage = this._sanitizer.bypassSecurityTrustUrl(image) as SafeUrl;
    } else {
      this.selectedImage = null;
    }

    if (image) {
      this.selectedFile = null;
    }

    const dialogRef = this._dialog.open(this.callAPIDialog);
    this.dialogForm = this._fb.group({
      service: [service, Validators.required],
      description: [description, Validators.required],
      amount: [amount, Validators.required],
      image: [image, Validators.required]
    });

    this.subscribe.add(dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result !== undefined) {
          if (result === 'yes') {
            const service = this.dialogForm.getRawValue();
            if (service.service !== '' && service.description !== '') {
              this.updateService(id, service.service, service.description, service.amount);
            } else {
              this._toastr.error('Both fields are required.');
              this.updateService(id, service, description, amount);
            }
          }
        }
      }
    }));
  }


  updateService(id: string, categoryName: string, description: string, amount: string) {
    const data = new FormData();
    data.append('id', id);
    data.append('categoryName', categoryName);
    data.append('description', description);
    data.append('amount', amount);

    if (this.selectedFile) {
      data.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.subscribe.add(this._servicerServices.updateService(data).subscribe({
      next: () => {
        this.dialogForm.reset();
        this.selectedImage = null;
        this.selectedFile = null;
        this.additionalServicesList();
      },
      complete: () => {
        Swal.fire('Successfully Updated', '', 'success');
      }
    }));
  }
  onFileSelected(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (inputElement.files && inputElement.files.length > 0) {
      const originalFile = inputElement.files[0];
      const extension = this.getFileExtension(originalFile.name);
      if (allowedExtensions.includes(extension)) {
        this.selectedFile = new File([originalFile], originalFile.name, { type: originalFile.type });
      } else {
        this._toastr.error('Please select a valid image file (jpg, jpeg, png, or gif).');
        this.selectedFile = null;
        this.selectedImage = null
        inputElement.value = '';
        return;
      }
      if (!this.additionalServices.get('image')?.hasError('invalidExtension') &&
        !this.additionalServices.get('image')?.hasError('invalidImage')) {
        this.selectedImage = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile)) as SafeUrl;
      }
    }
  }


  getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  additionalServicesList() {
    this.subscribe.add(this._servicerServices.additionalServices().subscribe({
      next: (res) => {
        this.dataSource.data = res.additional
      }
    }))
  }
  removeImage(): void {
    this.selectedImage = null;
    this.additionalServices.get('image')?.setValue(null);
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
