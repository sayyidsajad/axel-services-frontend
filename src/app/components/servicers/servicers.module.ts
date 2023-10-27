import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicersLoginComponent } from './servicers-login/servicers-login.component';
import { ServicersSignupComponent } from './servicers-signup/servicers-signup.component';
import { UserRoutingModule } from './servicers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicerProceduresComponent } from './servicer-procedures/servicer-procedures.component';
import { ServicerApprovalComponent } from './servicer-approval/servicer-approval.component';
import { ServicersOtpVerificationComponent } from './servicers-otp-verification/servicers-otp-verification.component';
import { HeaderComponent } from './header/header.component';
import { BookingsComponent } from './bookings/bookings.component';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    ServicersSignupComponent,
    ServicersLoginComponent,
    ServicerProceduresComponent,
    ServicerApprovalComponent,
    ServicersOtpVerificationComponent,
    HeaderComponent,
    BookingsComponent,
    ServicerNavComponent,
    DashboardComponent,
    ServicerBookingsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
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
    ChartModule
  ],
  providers: [ServicerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServicersModule { }
