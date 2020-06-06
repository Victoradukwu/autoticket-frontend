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
  user: object;
  image: string;
  thisYear = new Date().getFullYear();

  constructor(
    private authSrv: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.isAuthenticated = this.authSrv.isAuthenticated();
    this.isAdmin = (this.user && this.user['isStaff']);
    this.image = this.user['image'] ? this.user['image'] : "../../../assets/img/img_avatar3.png"
    // this.thisYear = new Date().getFullYear();
  }

  handleLogout() {
    localStorage.clear();
		this.router.navigate(['']);
		location.assign('')
  }
}
