import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { UserGuard, UserGuardOut } from 'src/app/guards/user/user.guard';
import { ServicerDetailsComponent } from './servicer-details/servicer-details.component';
import { ServicesListComponent } from './services-list/services-list.component';

const routes: Routes = [
  { path: '', title: 'Login', component: LoginComponent, canActivate: [UserGuard] },
  { path: 'signup', title: 'Sign Up', component: SignupComponent, canActivate: [UserGuard] },
  { path: 'otpVerification', title: 'Otp Verification', component: OtpVerificationComponent, canActivate: [UserGuard] },
  { path: 'home', title: 'Home', component: HomeComponent, canActivate: [UserGuardOut] },
  { path: 'servicerDetails/:id', title: 'ServicerDetails', component: ServicerDetailsComponent, canActivate: [UserGuardOut] },
  { path: 'servicesList', title: 'Services List', component: ServicesListComponent, canActivate: [UserGuardOut] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
