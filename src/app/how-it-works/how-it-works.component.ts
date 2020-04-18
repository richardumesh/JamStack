import { Component, OnInit } from '@angular/core';
import { UnleashService } from '../unleash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  selectedPage: any;

  constructor(private router: Router, private unleashService: UnleashService) { }

  navigateToPage(page) {
    this.selectedPage = page;
    page = '/' + page;
    this.router.navigate([page]);
  }

  ngOnInit() {
    this.unleashService.changeTheme('dark');
  }

}
