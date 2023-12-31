import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicersLoginComponent } from './servicers-login/servicers-login.component';
import { ServicersSignupComponent } from './servicers-signup/servicers-signup.component';
import { UserRoutingModule } from './servicers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicerApprovalComponent } from './servicer-approval/servicer-approval.component';
import { ServicersOtpVerificationComponent } from './servicers-otp-verification/servicers-otp-verification.component';
import { HeaderComponent } from './header/header.component';
import { ServicerService } from 'src/app/services/servicers/servicer.service';
import { ServicerNavComponent } from './servicer-nav/servicer-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ServicerBookingsComponent } from './servicer-bookings/servicer-bookings.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { ServicerVerificationProcessComponent } from './servicer-verification-process/servicer-verification-process.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AdditionalServicesComponent } from './additional-services/additional-services.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScriptLoaderService } from 'src/app/services/scripts/script-loader.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    ServicersSignupComponent,
    ServicersLoginComponent,
    ServicerApprovalComponent,
    ServicersOtpVerificationComponent,
    HeaderComponent,
    ServicerNavComponent,
    DashboardComponent,
    ServicerBookingsComponent,
    ChatComponent,
    ServicerVerificationProcessComponent,
    AdditionalServicesComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    NgxCaptchaModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSortModule,
    MatCheckboxModule,
    MatListModule,
    MatInputModule,
    MatStepperModule,
    ChartModule,
    FormsModule,
  ],
  providers: [ServicerService,ScriptLoaderService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServicersModule { }
