import { TicketsModule } from './components/tickets/tickets.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { FlightsModule } from './components/flights/flights.module';
import { LayoutComponent } from './components/layout/layout.component';
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
		TicketsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
