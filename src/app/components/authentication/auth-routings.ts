import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in.component';
import { RegisterComponent } from './register.component';
import { ResetPasswordComponent } from './reset-password.component';
import { InitiatePwResetComponent } from './initiate-pw-reset.component';
import { ChangePasswordComponent } from './change-password.component';


export const authRoutes: Routes = [
  { path: 'auth/sign-in', component: SignInComponent },
  { path: 'auth/register', component: RegisterComponent },
  {path: 'auth/reset-pw', component: ResetPasswordComponent},
  {path: 'auth/initiate-pw-reset', component: InitiatePwResetComponent},
  {path: 'auth/change-pw', component: ChangePasswordComponent}
];
