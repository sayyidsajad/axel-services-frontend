import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ServicerDetailsComponent } from './servicer-details/servicer-details.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { UsersComponent } from './users.component';
import { MatChipsModule } from '@angular/material/chips';
import { FooterComponent } from './footer/footer.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersService } from 'src/app/services/users/users.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InboxComponent } from './inbox/inbox.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper'
import { MatTabsModule } from '@angular/material/tabs';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { ChatComponent } from './chat/chat.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { OpenAiService } from 'src/app/services/open-ai/open-ai.service';
import { OpenAiComponent } from './open-ai/open-ai.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { SharedService } from 'src/app/services/shared/shared.service';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    OtpVerificationComponent,
    ServicerDetailsComponent,
    ServicesListComponent,
    UsersComponent,
    FooterComponent,
    BookingsComponent,
    UserProfileComponent,
    InboxComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChatComponent,
    HomepageComponent,
    AboutComponent,
    OpenAiComponent,
    SearchFilterPipe,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatStepperModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    GoogleSigninButtonModule,
    ScrollingModule,
    GalleryModule,
    CdkAccordionModule,
    LightboxModule, AsyncPipe,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
  ],
  providers: [UsersService, MessagingService,
    MatDatepickerModule,
    MatNativeDateModule,
    OpenAiService,SharedService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UserModule { }
