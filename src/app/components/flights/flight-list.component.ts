import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import { IFlight } from 'src/app/models/flight';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './flight-list.component.html',
})
export class FlightListComponent implements OnInit {
  isAuthenticated: boolean;
  isAdmin: boolean;
  flights: IFlight[] = [];
  flightSearchForm: FormGroup;
  modalRef: BsModalRef;

  constructor(
    private flightSrv: FlightsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private titleSrv: Title,
    private authSrv: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private modalSrv: BsModalService
    ) { this.titleSrv.setTitle('Autoticket-Home'); }

  ngOnInit() {
    this.isAuthenticated = this.authSrv.isAuthenticated();
    this.isAdmin = (this.isAuthenticated && (localStorage.getItem('isStaff') === 'true'));
    this.flightSearchForm = this.fb.group({
      destination: '',
      departure: '',
      status: '',
      departure_date: '',
      departure_date_lookup: ''
    });
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

  bookFlight(flightNumber: string): void {
    this.router.navigate(['/tickets/create', flightNumber]);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalSrv.show(template);
  }

  filterFlights() {
    let params = new HttpParams();
    for (const [key, val] of Object.entries(this.flightSearchForm.value)) {
      if (val) {
        params = params.append(key, `${val}`);
      }
    }
    this.flightSrv.getFlights(params).subscribe(
      flights => {
        this.modalRef.hide();
        this.flights = flights;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
}
