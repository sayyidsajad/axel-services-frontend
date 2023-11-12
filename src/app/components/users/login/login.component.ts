import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Space } from '../../validators/custom-validators';
import { environment } from 'src/environments/environment.development';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submit: boolean = false
  loginForm!: FormGroup
  private subscribe: Subscription = new Subscription()
  user!: SocialUser;
  loggedIn!: boolean;
  private accessToken = '';

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {            
      this.user = user;
      this.loggedIn = (user != null);      
      this.getAccessToken()
      this.getGoogleCalendarData()
      // if(this.loggedIn){
      //   this._userServices.userLogin((user)).subscribe({next:(res)=>{
          
      //   }})
      // }  
    });
    this.loginForm = this._fb.group({
      email: ['', [Space.noSpaceAllowed, Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){0,}@g(oogle)?mail\.com$")]],
      password: ['', [Validators.required, Validators.minLength(8), Space.noSpaceAllowed]],
    })
  }

  constructor(private _fb: FormBuilder, private _userServices: UsersService, private _router: Router, private _toastr: ToastrService, private _authService: SocialAuthService, private _httpClient: HttpClient) { }
  getAccessToken(): void {
    this._authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);        
  }

  getGoogleCalendarData(): void {
    if (!this.accessToken) return;
    this._httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((events) => {
        alert('Look at your console');
        console.log('events', events);
      });
  }
  refreshToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  onSubmit() {
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.subscribe.add(this._userServices.userLogin(user).subscribe({
        next: (res) => {
          if (res.verified === false) {
            this._router.navigate(['otpVerification'], { queryParams: { email: res.email } });
          } else {
            localStorage.setItem(environment.userSecret, res.access_token.toString());
            this._router.navigate(['home']);
          }
        },
        complete: () => {
          this._toastr.success('LoggedIn Successfully', 'Axel Services');
        }
      }))
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
