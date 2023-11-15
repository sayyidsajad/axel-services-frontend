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
import { MessagingService } from './services/messaging/messaging.service';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment.development';
import { NgxSpinnerModule } from "ngx-spinner";
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
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })],
  providers: [MessagingService, {
    provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true
  },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleProvider)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
