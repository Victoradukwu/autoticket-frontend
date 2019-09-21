import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
	signInForm: FormGroup;

  constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService,
		private router: Router
	) { }

  ngOnInit(): void {
		this.signInForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}
	signIn(): void {
    this.spinner.show();
    this.authService.signIn(this.signInForm.value).subscribe(
      resp => {
				this.spinner.hide();
				localStorage.setItem('token', resp['token']);
				localStorage.setItem('isStaff', resp['data']['isStaff']);
				this.router.navigate(['']);
        this.toastr.success(resp['message']);
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

}
