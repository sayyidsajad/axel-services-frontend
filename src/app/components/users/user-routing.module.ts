import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { UserGuardIn, UserGuardOut, UserGuardConfig } from 'src/app/guards/user/user.guard';
import { ServicerDetailsComponent } from './servicer-details/servicer-details.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InboxComponent } from './inbox/inbox.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChatComponent } from './chat/chat.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', title: 'Login', component: LoginComponent, canActivate: [UserGuardConfig, UserGuardIn] },
  { path: 'signup', title: 'Sign Up', component: SignupComponent, canActivate: [UserGuardConfig, UserGuardIn] },
  { path: 'otpVerification', title: 'Otp Verification', component: OtpVerificationComponent, canActivate: [UserGuardConfig, UserGuardIn] },
  { path: 'home', title: 'Home', component: HomeComponent, canActivate: [UserGuardOut] },
  { path: 'homepage', title: 'Home', component: HomepageComponent, canActivate: [UserGuardOut] },
  { path: 'servicerDetails/:id', title: 'Service Details', component: ServicerDetailsComponent, canActivate: [UserGuardOut] },
  { path: 'servicesList', title: 'Services List', component: ServicesListComponent, canActivate: [UserGuardOut] },
  { path: 'bookings', title: 'Bookings', component: BookingsComponent, canActivate: [UserGuardOut] },
  { path: 'userProfile', title: 'User Profile', component: UserProfileComponent, canActivate: [UserGuardOut] },
  { path: 'inbox', title: 'User Inbox', component: InboxComponent, canActivate: [UserGuardOut] },
  { path: 'forgotPassword', title: 'Forgot Password', component: ForgotPasswordComponent, canActivate: [UserGuardIn] },
  { path: 'resetPassword', title: 'Reset Password', component: ResetPasswordComponent, canActivate: [UserGuardIn] },
  { path: 'chat', title: 'Chat Page', component: ChatComponent, canActivate: [UserGuardOut] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
