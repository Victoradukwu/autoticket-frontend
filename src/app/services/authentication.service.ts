import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
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
		.pipe(catchError(this.handleError));
	}

	register(data: object): Observable<object> {
		return this.http.post<any>(`${environment.api_url}/users/register/`, data)
		.pipe(catchError(this.handleError));
	}

	private handleError(err: HttpErrorResponse) {	
		let errMessage = '';
		if (typeof(err.error.message) === 'string') {
			errMessage = err.error.message;
		}	else {
			for (let [key, value] of Object.entries(err.error.message)) {
				errMessage += `${key}: ${value}\n`
			}
		}
    return throwError(errMessage);
	}
	isAuthenticated(): boolean {
		const token = tokenGetter();
		const tokenExpired = this.jwtHelper.isTokenExpired()
		return (token && !tokenExpired)
	}
}
