import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import { IFlight } from 'src/app/models/flight';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
})
export class FlightListComponent implements OnInit {
  isAuthenticated: boolean;
  isAdmin: boolean;
  flights: IFlight[] = [];

  constructor(
    private flightSrv: FlightsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private titleSrv: Title,
    private authSrv: AuthenticationService,
    private router: Router
    ) { this.titleSrv.setTitle('Autoticket-Home'); }

  ngOnInit() {
    this.isAuthenticated = this.authSrv.isAuthenticated();
    this.isAdmin = (this.isAuthenticated && (localStorage.getItem('isStaff') === 'true'));
    this.spinner.show();
    this.flightSrv.getFlights().subscribe(
      flights => {
        this.flights = flights;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
  editFlight(flight: IFlight): void {
    this.router.navigateByUrl('/flights/edit', {state: flight});
  }
}
