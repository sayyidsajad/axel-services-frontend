import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { ServicersApprovalComponent } from './servicers-approval/servicers-approval.component';
import { UserMgtComponent } from './user-mgt/user-mgt.component';
import { BookingMgtComponent } from './booking-mgt/booking-mgt.component';
import { CategoryMgtComponent } from './category-mgt/category-mgt.component';

const routes: Routes = [
  { path: '', title: 'Login', component: AdminLoginComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', title: 'Dashboard', component: AdminDashboardComponent },
  { path: 'servicersApproval', title: 'Servicers Approval', component: ServicersApprovalComponent },
  { path: 'userMgt', title: 'User Management', component: UserMgtComponent },
  { path: 'bookingMgt', title: 'Booking Management', component: BookingMgtComponent },
  { path: 'categoryMgt', title: 'Category Management', component: CategoryMgtComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
