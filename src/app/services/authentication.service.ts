import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/helpers/handle-error';
import { tokenGetter } from 'src/app/helpers/tokenGetter';
import { AuthService } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private socialAuthService: AuthService,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }
  socialAuth(socialPlatformProvider: string): Observable<object> {
      return from(this.socialAuthService.signIn(socialPlatformProvider))
      .pipe(catchError(handleError));
    }

  exchangeToken(backend: string, data: object): Observable<object> {
      return this.http.post<any>(`${environment.api_url}/users/social/${backend}/`, data)
      .pipe(catchError(handleError));
    }  

  signIn(data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/users/login/`, data)
    .pipe(catchError(handleError));
  }

  changePassword(data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/users/change-password/`, data)
    .pipe(catchError(handleError));
  }

  resetPassword(data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/users/password-reset/confirm/`, data)
    .pipe(catchError(handleError));
  }

  initiatePasswordReset(data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/users/password-reset/`, data)
    .pipe(catchError(handleError));
  }

  register(data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/users/register/`, data)
    .pipe(catchError(handleError));
  }
  isAuthenticated(): boolean {
    const token = tokenGetter();
    const tokenExpired = this.jwtHelper.isTokenExpired();
    return (token && !tokenExpired);
  }
}
