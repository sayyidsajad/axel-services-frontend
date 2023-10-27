import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicersLoginComponent } from './servicers-login/servicers-login.component';
import { ServicersSignupComponent } from './servicers-signup/servicers-signup.component';
import { ServicerProceduresComponent } from './servicer-procedures/servicer-procedures.component';
import { ServicerGuardIn, ServicerGuardConfig, ServicerGuardOut } from 'src/app/guards/servicer/servicer.guard';
import { ServicerApprovalComponent } from './servicer-approval/servicer-approval.component';
import { ServicersOtpVerificationComponent } from './servicers-otp-verification/servicers-otp-verification.component';
import { ServicerNavComponent } from './servicer-nav/servicer-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicerBookingsComponent } from './servicer-bookings/servicer-bookings.component';

const routes: Routes = [
  { path: '', title: 'Login', component: ServicersLoginComponent, canActivate: [ServicerGuardOut, ServicerGuardConfig] },
  { path: 'signup', title: 'Sign Up', component: ServicersSignupComponent, canActivate: [ServicerGuardOut, ServicerGuardConfig] },
  { path: 'servicerProcedures', title: 'Procedures', component: ServicerProceduresComponent, canActivate: [ServicerGuardOut, ServicerGuardConfig] },
  { path: 'adminServicerApproval', title: 'Admin Servicer Approval', component: ServicerApprovalComponent, canActivate: [ServicerGuardOut, ServicerGuardConfig] },
  { path: 'servicerOtpVerification', title: 'OTP Verification', component: ServicersOtpVerificationComponent, canActivate: [ServicerGuardOut, ServicerGuardConfig] },
  {
    path: 'main', title: 'Servicer Main', component: ServicerNavComponent, canActivate: [ServicerGuardIn], children: [
      { path: 'dashboard', title: 'Servicer Dashboard', component: DashboardComponent, canActivate: [ServicerGuardIn] },
      { path: 'bookings', title: 'Servicer Bookings', component: ServicerBookingsComponent, canActivate: [ServicerGuardIn] }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
