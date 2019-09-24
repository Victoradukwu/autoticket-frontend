import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/helpers/handle-error';
import { tokenGetter } from 'src/app/helpers/tokenGetter';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  signIn(data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/users/login/`, data)
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
