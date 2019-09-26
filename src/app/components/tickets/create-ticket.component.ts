import { TicketsService } from 'src/app/services/tickets.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Title } from '@angular/platform-browser';
import { validateExpiry } from 'src/app/helpers/validators';

@Component({
  templateUrl: './create-ticket.component.html'
})
export class CreateTicketComponent implements OnInit {
  ticketForm: FormGroup;
  flightNumber: string;
  validYears: number[] = [];
  validMonths: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private titleSrv: Title,
    private ticketSrv: TicketsService,
    private route: ActivatedRoute,
  ) {this.titleSrv.setTitle('Autoticket book-ticket'); }

  ngOnInit() {
    this.flightNumber = this.route.snapshot.paramMap.get('fltNumber');
    this.generateValidYears();
    this.ticketForm = this.fb.group({
      passenger: ['', Validators.required],
      cardNumber: ['', Validators.required],
      pin: ['', Validators.required],
      cvv: ['', Validators.required],
      cardExpiry: this.fb.group({
        expiryMonth: ['Expiry Month', [Validators.required, validateExpiry('Expiry Month')]],
        expiryYear: ['Expiry Year', [Validators.required, validateExpiry('Expiry Year')]]
      }),
    });
  }

  generateValidYears() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const lastValidYear = currentYear + 10;
    for (let i = currentYear; i <= lastValidYear; i++ ) {
      this.validYears.push(i);
    }
  }

  createTicket() {
    this.spinner.show();
    const formValue = this.ticketForm.value
    const data = {
      passenger: formValue.passenger,
      flight: this.flightNumber,
      pin: formValue.pin,
      number: formValue.cardNumber,
      cvv: formValue.cvv,
      expiry_month: formValue.cardExpiry['expiryMonth'],
      expiry_year: formValue.cardExpiry['expiryYear']
    };
    this.ticketSrv.createTicket(data).subscribe(
      (resp) => {
        this.spinner.hide();
        this.router.navigate(['']);
        this.toastr.success(resp.message);
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  isInvalid(controlName: string) {
    const ctrl = this.ticketForm.controls[controlName];
    return {'is-invalid':  (ctrl.dirty || ctrl.touched) &&  ctrl.invalid};
  }
}
