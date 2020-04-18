import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-activity',
  templateUrl: './welcome-activity.component.html',
  styleUrls: ['./welcome-activity.component.css'],
})
export class WelcomeActivityComponent implements OnInit {
  showScreen2 = false;
  constructor( private router: Router ) { }

  ngOnInit() {
  }

  nextActivity() {
    this.router.navigate(['/activity1']);
  }

}
