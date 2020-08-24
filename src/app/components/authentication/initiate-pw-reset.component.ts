import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-initiate-pw-reset',
  templateUrl: './initiate-pw-reset.component.html',
  styleUrls: ['./initiate-pw-reset.component.css']
})
export class InitiatePwResetComponent implements OnInit {
  pwResetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pwResetForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  reset(): void {
    this.spinner.show();
    this.authService.initiatePasswordReset(this.pwResetForm.value).subscribe(
      () => {
        this.spinner.hide();
				this.router.navigate(['auth/sign-in']);
        this.toastr.success('Please check your email');
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

}
