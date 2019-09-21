import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import { IFlight } from 'src/app/models/flight';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
})
export class FlightListComponent implements OnInit {
	flights: IFlight[] = [];

  constructor(
		private flightService: FlightsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private titleService: Title
		) { this.titleService.setTitle('Autoticket-Home'); }

  ngOnInit() {
		this.spinner.show();
		this.flightService.getFlights().subscribe(
      flights => {
				this.flights = flights;
				this.spinner.hide();
      },
      error => {this.spinner.hide();
				this.toastr.error(error);
			}
    );
  }
}
