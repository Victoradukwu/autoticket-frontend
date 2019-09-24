import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in.component';
import { RegisterComponent } from './register.component';


export const authRoutes: Routes = [
  { path: 'auth/sign-in', component: SignInComponent },
  { path: 'auth/register', component: RegisterComponent }
];
