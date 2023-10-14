import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicersLoginComponent } from './servicers-login/servicers-login.component';
import { ServicersSignupComponent } from './servicers-signup/servicers-signup.component';
import { UserRoutingModule } from './servicers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicerProceduresComponent } from './servicer-procedures/servicer-procedures.component';
import { ServicerApprovalComponent } from './servicer-approval/servicer-approval.component';
import { ServicerDashboardComponent } from './servicer-dashboard/servicer-dashboard.component';
import { ServicersOtpVerificationComponent } from './servicers-otp-verification/servicers-otp-verification.component';

@NgModule({
  declarations: [
    ServicersSignupComponent,
    ServicersLoginComponent,
    ServicerProceduresComponent,
    ServicerApprovalComponent,
    ServicerDashboardComponent,
    ServicersOtpVerificationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class ServicersModule { }
