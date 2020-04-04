import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  fileToUpload: File;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: '',
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      image: ['', [Validators.required]]
    });
  }

  onFileSelected(event) {
    this.fileToUpload = <File> event.target.files[0];
  }

  register() {
    const formValue = this.registerForm.value;
    const fd = new FormData();
    fd.append('firstName', formValue.firstName);
    fd.append('lastName', formValue.lastName);
    fd.append('email', formValue.email);
    fd.append('password', formValue.password);
    fd.append('confirmPassword', formValue.confirmPassword);
    fd.append('image', this.fileToUpload, this.fileToUpload.name);

    this.spinner.show();
    this.authService.register(fd).subscribe(
      resp => {
        this.spinner.hide();
        this.router.navigate(['auth/sign-in']);
        this.toastr.success(resp['message']);
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }

  isInvalid(controlName: string) {
    const ctrl = this.registerForm.controls[controlName];
    return {'is-invalid':  (ctrl.dirty || ctrl.touched) &&  ctrl.invalid};
  }
}
