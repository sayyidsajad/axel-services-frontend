import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InterceptorInterceptor } from './http-interceptors/interceptor.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MaterialModuleModule } from './material-module/material-module.module';
import { SocketIoConfig } from 'ngx-socket-io';
import { MessagingService } from './services/messaging/messaging.service';
import { NbThemeModule } from '@nebular/theme';
const config: SocketIoConfig = { url: 'localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    NgIf,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),  ],
  providers: [MessagingService,{
    provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
