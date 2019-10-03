import { Component, OnInit, TemplateRef } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './tickets-list.component.html'
})
export class TicketsListComponent implements OnInit {
  modalRef: BsModalRef;
  tickets: any[] = [];
  ticketSearchForm: FormGroup;

  constructor(
    private ticketSrv: TicketsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private titleSrv: Title,
    private fb: FormBuilder,
    private modalSrv: BsModalService
) { this.titleSrv.setTitle('Autoticket-tickets'); }

  ngOnInit() {
    this.ticketSearchForm = this.fb.group({
      passenger: '',
      bookedBy: '',
      flightNumber: '',
			flightDate: '',
			bookedBy_lookup:''
    });
    this.spinner.show();
    this.ticketSrv.getTickets().subscribe(
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

  filterTickets() {
    let params = new HttpParams();
    for (const [key, val] of Object.entries(this.ticketSearchForm.value)) {
      if (val) {
        params = params.append(key, `${val}`);
      }
    }
    this.ticketSrv.getTickets(params).subscribe(
      tickets => {
        this.modalRef.hide();
        this.tickets = tickets;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalSrv.show(template);
  }
}
