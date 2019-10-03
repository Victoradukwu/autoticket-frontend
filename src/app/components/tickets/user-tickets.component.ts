import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from 'src/app/helpers/tokenGetter';

@Component({
  templateUrl: './user-tickets.component.html'
})
export class UserTicketsComponent implements OnInit {
  tickets: any[] = [];

  constructor(
    private ticketSrv: TicketsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    this.spinner.show();
    const token = tokenGetter();
    const userEmail = this.jwtHelper.decodeToken(token).email;
    let params = new HttpParams();
    params = params.append('bookedBy', userEmail);
    params = params.append('bookedBy_lookup', 'iexact');
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
