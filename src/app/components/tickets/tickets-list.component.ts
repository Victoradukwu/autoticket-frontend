import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  templateUrl: './tickets-list.component.html'
})
export class TicketsListComponent implements OnInit {

  isAuthenticated: boolean;
  isAdmin: boolean;
  tickets: any[] = [];
  pageTitle: string;
  ticketSearchForm: FormGroup;

  constructor(
    private ticketSrv: TicketsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private titleSrv: Title,
    private authSrv: AuthenticationService,
    private fb: FormBuilder,
    ) { this.titleSrv.setTitle('Autoticket-tickets'); }

  ngOnInit() {
    this.ticketSearchForm = this.fb.group({
      passenger: '',
      booked_by: '',
      flight_number: '',
      flight_date: ''

    })
    this.isAuthenticated = this.authSrv.isAuthenticated();
    this.isAdmin = (this.isAuthenticated && (localStorage.getItem('isStaff') === 'true'));
    this.spinner.show();
    this.ticketSrv.getTickets().subscribe(
      tickets => {
        this.tickets = tickets;
        this.pageTitle = 'All tickets';
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  filterTickets() {
    let params = new HttpParams();
    for (let [key, val] of Object.entries(this.ticketSearchForm.value)) {
      if (val) {
        params = params.append(key, `${val}`);
      }
    }
    this.ticketSrv.getTickets(params).subscribe(
      tickets => {
        this.tickets = tickets;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

}
