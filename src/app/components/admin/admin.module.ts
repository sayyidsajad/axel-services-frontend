import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicersApprovalComponent } from './servicers-approval/servicers-approval.component';
import { UserMgtComponent } from './user-mgt/user-mgt.component';
import { BookingMgtComponent } from './booking-mgt/booking-mgt.component';
import { CategoryMgtComponent } from './category-mgt/category-mgt.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    ServicersApprovalComponent,
    UserMgtComponent,
    BookingMgtComponent,
    CategoryMgtComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FormsModule
  ]
})
export class AdminModule { }
