import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnleashService } from '../unleash.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  loggedIn = false;
  isDashboard = false;
  constructor(public unleashService: UnleashService, private router: Router) {}

  ngOnInit() {
    this.loggedIn = true;
    this.isDashboard = false;
    this.unleashService.changeTheme('dark');
    this.unleashService.postLogin(true);
    this.unleashService.dashboardFlow(false);
    this.unleashService.profilePageFlow(false);
    this.unleashService.contactUsFlow(true);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
    this.isDashboard = true;
  }
  
  ngOnDestroy() {
    this.unleashService.postLogin(false);
    this.unleashService.dashboardFlow(true);
    this.unleashService.profilePageFlow(true);
    this.unleashService.contactUsFlow(false);
  }

}
