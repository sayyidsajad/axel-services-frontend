import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ServicerDetailsComponent } from './servicer-details/servicer-details.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { UsersComponent } from './users.component';
import { MatChipsModule } from '@angular/material/chips';
import { FooterComponent } from './footer/footer.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersService } from 'src/app/services/users/users.service';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InboxComponent } from './inbox/inbox.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper'
import { IgxDatePickerModule, IgxIconModule, IgxInputGroupModule, IgxTimePickerModule } from 'igniteui-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { ChatComponent } from './chat/chat.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    OtpVerificationComponent,
    ServicerDetailsComponent,
    ServicesListComponent,
    UsersComponent,
    FooterComponent,
    BookingsComponent,
    CategoriesListComponent,
    UserProfileComponent,
    InboxComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChatComponent,
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IgxTimePickerModule,
    IgxInputGroupModule,
    IgxIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatStepperModule,
    MatTabsModule,
    NgIf,
    MatGridListModule,
    MatCardModule,  
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    IgxDatePickerModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.googleProvider
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }, UsersService, MessagingService,
  MatDatepickerModule,
    MatNativeDateModule  
],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UserModule { }
