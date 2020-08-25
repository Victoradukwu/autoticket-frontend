import { SignInComponent } from './sign-in.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth-routings';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { SocialAuthComponent } from './social-auth.component';
import { ResetPasswordComponent } from './reset-password.component';
import { InitiatePwResetComponent } from './initiate-pw-reset.component';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  declarations: [SignInComponent, RegisterComponent, SocialAuthComponent, ResetPasswordComponent, InitiatePwResetComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(authRoutes)
  ],
})
export class AuthenticationModule { }
