import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnleashService } from '../unleash.service';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selectedPage: any;
  loggedIn = false;
  letsGetStartedFlow = false;
  profile: any;
  themeColor: any;
  signIn = false;
  signUp = false;
  isDashboard = false;
  isContactUs = false;
  isProfile = false;
  isRecoverPass = false;
  loading;
  userLoggedIn: any;

  constructor(private router: Router, private unleashService: UnleashService, private authService: AuthService) { }

  navigateToPage(page) {
    this.selectedPage = page;
    page = '/' + page;
    this.router.navigate([page]);
  }

  ngOnInit() {
    this.userLoggedIn = JSON.parse(localStorage.getItem('newUserLoggedinDetails'));
    this.loggedIn = !this.authService.isTokenExpired();
    this.unleashService.navBarStatus = false;
    this.unleashService.currentTeam.subscribe(theme => {
      this.themeColor = theme;
    });
  }

  get showSignIn() {
    const url = this.router.url;
    if (url.includes('login') || url.includes('reset-password')) {
      return false;
    } else {
      return true;
    }
  }
  get showCreateAccount() {
    const url = this.router.url;
    if (url.includes('registration')) {
      return false;
    } else {
      return true;
    }
  }
  get showDashboard() {
    const url = this.router.url;
    if (url.includes('dashboard') || url.includes('edit-profile') || url.includes('contact-us')) {
      return false;
    } else {
      return true;
    }
  }

  collapseNavebar() {
    if (this.unleashService.navBarStatus === false) {
      this.unleashService.navBarStatus = true;
    } else {
      this.unleashService.navBarStatus = false;
    }
  }

  logout() {
    this.router.navigate(['/home']);
    localStorage.clear();
    this.ngOnInit();
  }

  goToMyProfile() {
    this.router.navigate(['edit-profile']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToContactUs() {
    this.router.navigate(['contact-us']);
  }
}