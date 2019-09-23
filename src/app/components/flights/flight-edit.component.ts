import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { FlightsService } from 'src/app/services/flights.service';
import { IFlight } from 'src/app/models/flight';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnInit {
	flightForm: FormGroup;
	flight: IFlight;
	pageTitle: string;

  constructor(
		private fb: FormBuilder,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private router: Router,
		private flightSrv: FlightsService,
		private titleSrv: Title
	) { this.titleSrv.setTitle('Autoticket-create and update'); }

  ngOnInit() {
		this.flightForm = this.fb.group({
			departure: ['', Validators.required],
			destination: ['', Validators.required],
			fare: ['', Validators.required],
			number: ['', Validators.required],
			status: [1, Validators.required],
			departureTime: ['', Validators.required],
			departureDate: ['', Validators.required],
		});
		this.displayFlight();
	}
	
	onSubmit() {
		this.spinner.show();
		const data = this.flight;
		data['departure'] = this.flightForm.value.departure;
		data['destination'] = this.flightForm.value.destination;
		data['fare'] = this.flightForm.value.fare;
		data['number'] = this.flightForm.value.number;
		data['departure_date'] = this.flightForm.value.departureDate;
		data['departure_time'] = this.flightForm.value.departureTime;
		data['status'] = this.flightForm.value.status;
		this.flightSrv.saveFlight(data).subscribe(
      () => {
				this.spinner.hide();
				this.router.navigate(['']);
        this.toastr.success('Update is successful');
      },
      error => {this.spinner.hide();
				this.toastr.error(error);
			}
    );
	}

	displayFlight(): void {
    if (this.flightForm) {
      this.flightForm.reset();
		}
		const flight = history.state;
    if (!flight) {
      this.pageTitle = 'Schedule a flight';
    } else {
			this.flight = flight;
			this.pageTitle = `Edit Flight: ${this.flight.number}`;
			this.flightForm.patchValue({
				departure: this.flight.departure,
				destination: this.flight.destination,
				fare: this.flight.fare,
				number: this.flight.number,
				status: this.flight.status,
				departureTime: this.flight.departure_time,
				departureDate: this.flight.departure_date,
			});
    }
  }
}
