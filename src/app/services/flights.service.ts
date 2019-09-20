import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

	constructor(private http: HttpClient) { }
	
	getFlights(): Observable<object[]> {
		return this.http.get<any>(`${environment.api_url}/flights/`)
		.pipe(catchError(this.handleError));
	}
	
	private handleError(err: HttpErrorResponse) {
    return throwError(err.message);
  }
}
