import { AuthenticationModule } from './components/authentication/authentication.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsModule } from './components/flights/flights.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { tokenGetter } from './helpers/tokenGetter';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		JwtModule.forRoot({
      config: {
				tokenGetter: tokenGetter,
				skipWhenExpired: true,
        whitelistedDomains: ['http://localhost:8000', 'https://auto-ticket.herokuapp.com'],
      }
    }),
		ReactiveFormsModule,
		FormsModule,
		AngularFontAwesomeModule,
		BrowserAnimationsModule,
		FlightsModule,
		AuthenticationModule,
		ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
