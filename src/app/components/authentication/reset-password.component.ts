import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  pwResetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pwResetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      token: ['', Validators.required],
    });

      this.route.queryParams
        .subscribe(params => {
          this.pwResetForm.patchValue({
            token: params.token,
          });
        }
      );
  }

  reset(): void {
    this.spinner.show();
    this.authService.resetPassword(this.pwResetForm.value).subscribe(
      () => {
        this.spinner.hide();
				this.router.navigate(['auth/sign-in']);
        this.toastr.success('Password successfully reset');
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

}
