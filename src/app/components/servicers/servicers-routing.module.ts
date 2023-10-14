import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicersLoginComponent } from './servicers-login/servicers-login.component';
import { ServicersSignupComponent } from './servicers-signup/servicers-signup.component';
import { ServicerProceduresComponent } from './servicer-procedures/servicer-procedures.component';
import { ServicerGuard } from 'src/app/guards/servicer/servicer.guard';
import { ServicerApprovalComponent } from './servicer-approval/servicer-approval.component';
import { ServicersOtpVerificationComponent } from './servicers-otp-verification/servicers-otp-verification.component';
import { ServicerDashboardComponent } from './servicer-dashboard/servicer-dashboard.component';

const routes: Routes = [
  { path: '', title: 'Login', component: ServicersLoginComponent, canActivate: [ServicerGuard] },
  { path: 'signup', title: 'Sign Up', component: ServicersSignupComponent, canActivate: [ServicerGuard] },
  { path: 'procedures', title: 'Procedures', component: ServicerProceduresComponent, canActivate: [ServicerGuard] },
  { path: 'adminServicerApproval', title: 'Admin Servicer Approval', component: ServicerApprovalComponent, canActivate: [ServicerGuard] },
  { path: 'servicerOtpVerification', title: 'OTP Verification', component: ServicersOtpVerificationComponent, canActivate: [ServicerGuard] },
  { path: 'servicerDashboard', title: 'Servicer Dashboard', component: ServicerDashboardComponent, canActivate: [ServicerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
