import { SignInComponent } from './sign-in.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth-routings';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { SocialAuthComponent } from './social-auth.component';

@NgModule({
  declarations: [SignInComponent, RegisterComponent, SocialAuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(authRoutes)
  ],
})
export class AuthenticationModule { }
