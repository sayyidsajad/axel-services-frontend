import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMgtComponent } from './user-mgt/user-mgt.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingMgtComponent } from './booking-mgt/booking-mgt.component';
import { CategoryMgtComponent } from './category-mgt/category-mgt.component';
import { ServicersMgtComponent } from './servicers-mgt/servicers-mgt.component';
import { ServicersApprovalComponent } from './servicers-approval/servicers-approval.component';
import { AdminGuardIn, AdminGuardOut, AdminGuardConfig } from 'src/app/guards/admin/admin.guard';

const routes: Routes = [
  { path: '', title: 'Login', component: AdminLoginComponent, canActivate: [AdminGuardConfig, AdminGuardOut] },
  {
    path: 'main', title: 'Admin Main', component: AdminNavComponent, canActivate: [AdminGuardIn], children: [
      { path: 'dashboard', title: 'Admin Dashboard', component: DashboardComponent, canActivate: [AdminGuardIn] },
      { path: 'userMgt', title: 'User Management', component: UserMgtComponent, canActivate: [AdminGuardIn] },
      { path: 'bookingMgt', title: 'Booking Management', component: BookingMgtComponent, canActivate: [AdminGuardIn] },
      { path: 'categoryMgt', title: 'Category Management', component: CategoryMgtComponent, canActivate: [AdminGuardIn] },
      { path: 'servicersMgt', title: 'Servicers Management', component: ServicersMgtComponent, canActivate: [AdminGuardIn] },
      { path: 'servicersApproval', title: 'Servicers Approval', component: ServicersApprovalComponent, canActivate: [AdminGuardIn] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
