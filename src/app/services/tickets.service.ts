import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/helpers/handle-error';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  createTicket(data: object): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/tickets/book/`, data)
    .pipe(catchError(handleError));
	}

	getTickets(params = {}): Observable<any[]> {
    return this.http.get<any>(`${environment.api_url}/tickets/list/`, {params: params})
    .pipe(catchError(handleError));
	}

}
