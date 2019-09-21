import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
	isAuthenticated: boolean;
	isAdmin: boolean;

  constructor(private authSrv: AuthenticationService) { }

  ngOnInit() {
		this.isAuthenticated = this.authSrv.isAuthenticated();
		this.isAdmin = (this.isAuthenticated && (localStorage.getItem('isStaff') == 'true'));
	}
	
	handleLogout() {
		localStorage.clear();
    location.reload(true);
	}
}
