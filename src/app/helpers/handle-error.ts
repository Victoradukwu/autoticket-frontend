import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleError = (err: HttpErrorResponse) => {
  let errMessage = '';
  if (typeof(err.error.detail) === 'string') {
    errMessage = err.error.detail;
  }	else {
    for (const [key, value] of Object.entries(err.error.detail)) {
      errMessage += `${key}: ${value}\n`;
    }
  }
  return throwError(errMessage);
};
