import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  isAuthenticated: boolean;
  isAdmin: boolean;

  constructor(
		private authSrv: AuthenticationService,
		private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.authSrv.isAuthenticated();
    this.isAdmin = (this.isAuthenticated && (localStorage.getItem('isStaff') === 'true'));
  }

  handleLogout() {
		localStorage.clear();
		this.router.navigate([''])
  }
}
