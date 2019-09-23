import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';

export const handleError = (err: HttpErrorResponse) => {	
	let errMessage = '';
	if (err.error.detail) {
		errMessage = err.error.detail;
	} else if (typeof(err.error.message) === 'string') {
		errMessage = err.error.message;
	}	else {
		for (let [key, value] of Object.entries(err.error.message)) {
			errMessage += `${key}: ${value}\n`
		}
	}
	return throwError(errMessage);
}
