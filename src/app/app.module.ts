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
import { MessagingService } from './services/messaging/messaging.service';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment.development';
import { NgxSpinnerModule } from "ngx-spinner";
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import { LIGHTBOX_CONFIG, LightboxConfig } from 'ng-gallery/lightbox';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-ripple-multiple' }),
    ],
  providers: [MessagingService, {
    provide: LIGHTBOX_CONFIG,
    useValue: {
      keyboardShortcuts: false,
      exitAnimationTime: 1000
    } as LightboxConfig
  }, {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    }, {
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
