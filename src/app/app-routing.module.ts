import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', title: 'User', loadChildren: () => import('./components/users/user.module').then(m => m.UserModule) },
  { path: 'admin', title: 'Admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'servicer', title: 'Servicer', loadChildren: () => import('./components/servicers/servicers.module').then(m => m.ServicersModule) },
  { path: '**', title: '404 Error', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
