import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { FlightsModule } from './components/flights/flights.module';
import { TicketsModule } from './components/tickets/tickets.module';
import { LayoutComponent } from './components/layout/layout.component';
import { tokenGetter } from './helpers/tokenGetter';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
  [
  {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('250475589468786')
  },
  {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('92005104280-u5n98j0urda69jr3jimun8m19jk4cb54.apps.googleusercontent.com')
  }
  ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        skipWhenExpired: true,
        whitelistedDomains: ['localhost:8000', 'auto-ticket.herokuapp.com'],
      }
    }),
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    FlightsModule,
    AuthenticationModule,
    TicketsModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
