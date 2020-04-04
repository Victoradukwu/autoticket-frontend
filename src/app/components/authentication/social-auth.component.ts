import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, AuthService} from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.css']
})
export class SocialAuthComponent implements OnInit {

  constructor(
    private router: Router,
    private authSrv: AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
  }

  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider: string;
    let backend: string;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      backend = 'facebook';
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      backend = 'google-oauth2';
    }
    this.spinner.show();
    this.authSrv.socialAuth(socialPlatformProvider).subscribe(
      resp => {
        this.spinner.hide();
        this.exchangeToken(backend, resp['authToken']);
      },
      error => {
        this.toastr.error(error);
      }
    );
    }

  exchangeToken(backend: string, token: string) {
    const data = {'accessToken': token}
    this.authSrv.exchangeToken(backend, data).subscribe(
      resp => {
        this.spinner.hide();
        localStorage.setItem('token', resp['token']);
        localStorage.setItem('isStaff', resp['data']['isStaff']);
				this.router.navigate(['']);
				location.assign('')
        this.toastr.success(resp['message']);
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }

    );
  }

}
