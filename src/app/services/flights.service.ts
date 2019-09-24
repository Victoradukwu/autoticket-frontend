import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/helpers/handle-error';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }

  getFlights(): Observable<object[]> {
    return this.http.get<any>(`${environment.api_url}/flights/`)
    .pipe(catchError(handleError));
  }

  saveFlight(data: any): Observable<object> {
    if (data.id) {
      return this.http.put<any>(`${environment.api_url}/flights/${data.id}/`, data)
      .pipe(catchError(handleError));
    } else {
      return this.http.post<any>(`${environment.api_url}/flights/`, data)
      .pipe(catchError(handleError));
    }
  }
}
