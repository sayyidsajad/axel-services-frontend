import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicersApprovalComponent } from './servicers-approval/servicers-approval.component';
import { UserMgtComponent } from './user-mgt/user-mgt.component';
import { BookingMgtComponent } from './booking-mgt/booking-mgt.component';
import { CategoryMgtComponent } from './category-mgt/category-mgt.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ServicersMgtComponent } from './servicers-mgt/servicers-mgt.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';

@NgModule({
  declarations: [
    AdminLoginComponent,
    ServicersApprovalComponent,
    UserMgtComponent,
    BookingMgtComponent,
    CategoryMgtComponent,
    ServicersMgtComponent,
    AdminNavComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FormsModule,
    NgIf,
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
  ],
  providers: [AdminService],
})
export class AdminModule { }
