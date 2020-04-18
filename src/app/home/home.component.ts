import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnleashService } from '../unleash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
