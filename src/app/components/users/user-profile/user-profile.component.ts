import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IUserProfile } from 'src/app/services/users/types/user-types';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Space, WhiteSpace, confirmPasswordValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  @ViewChild('walletHistory')
  walletHistory!: TemplateRef<any>;
  selectedFile!: File
  private subscribe: Subscription = new Subscription()
  userDetails!: any
  editProfile!: FormGroup;
  changePasswordForm!: FormGroup
  changePasswordToggle!: boolean;
  ngOnInit(): void {
    this.changePasswordForm = this._fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]],
      password: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]]
    }, { validators: confirmPasswordValidator })
    this.getUser()
  }

  constructor(private _userServices: UsersService, public _dialog: MatDialog, private _fb: FormBuilder, private _toastr: ToastrService) { }
  getUser() {
    this.subscribe.add(this._userServices.userProfile().subscribe({
      next:
        (res) => {
          this.userDetails = res.user          
        }
    }))
  }
  changeProfile(event: any) {
    this.selectedFile = <File>event.target.files[0]
    const data = new FormData()
    data.append('img', this.selectedFile, this.selectedFile.name);
    this.subscribe.add(this._userServices.profilePicture(data).subscribe({
      next: () => {
        this.getUser()
      }
    }))
  }
  saveChanges() {
    const update = this.changePasswordForm.getRawValue()
    this.subscribe.add(this._userServices.editProfile(update.editName, update.editPhone).subscribe({
      next: () => {
        this._dialog.closeAll()
        this.getUser()
      }, complete: () => {
        this._toastr.success('Updated Successfully')
      }
    }))
  }
  togglePasswordForm() {
    this.changePasswordToggle = !this.changePasswordToggle;
  }
  changePassword() {
    const changed = this.changePasswordForm.getRawValue()
    this.subscribe.add(this._userServices.updatePassword(changed.currentPassword, changed.password).subscribe({
      next: () => {
        this.togglePasswordForm()
        this.getUser()
      },
      complete: () => {
        this._toastr.success('Successfully changed password')
      }
    }))
  }
  openDialog() {
    this.editProfile = this._fb.group({
      editName: [this.userDetails.name, [WhiteSpace.validate, Validators.required]],
      editPhone: [this.userDetails.phone, [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]+$/)]]
    })
    this._dialog.open(this.callAPIDialog);
  }
  openWalletHistoryDialog() {
    this._dialog.open(this.walletHistory);
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}


