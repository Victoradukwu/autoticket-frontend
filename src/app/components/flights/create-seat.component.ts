import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { FlightsService } from 'src/app/services/flights.service';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './create-seat.component.html',
})
export class CreateSeatComponent implements OnInit {

  seatForm: FormGroup;
  flightNumbers: string[];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private flightSrv: FlightsService,
    private titleSrv: Title
  ) { this.titleSrv.setTitle('Autoticket-create-seat'); }

  ngOnInit() {
    this.getflightNumbers();
    this.seatForm = this.fb.group({
      seatNumber: ['', Validators.required],
      status: '1',
      flightNumber: ['', Validators.required],
    });
  }

  getflightNumbers() {
    this.flightSrv.getFlights().subscribe(
      flights => {
        this.flightNumbers = flights.map(flight => flight.number);
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  createSeat() {
    this.spinner.show();
    const data = {
      seat_number: this.seatForm.value.seatNumber,
      flight_number: this.seatForm.value.flightNumber,
      status: this.seatForm.value.status,
    };
    this.flightSrv.createSeat(data).subscribe(
      () => {
        this.spinner.hide();
        this.router.navigate(['']);
        this.toastr.success('Update is successful');
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
  isInvalid(controlName: string) {
    const ctrl = this.seatForm.controls[controlName];
    return {'is-invalid':  (ctrl.dirty || ctrl.touched) &&  ctrl.invalid};
  }
}
