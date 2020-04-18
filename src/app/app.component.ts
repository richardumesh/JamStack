import { Component, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unleash-ui';

  showHead = false;
  scrollUp: any;

  constructor(private router: Router,  private element: ElementRef) {

    this.scrollUp = this.router.events.subscribe((path) => {
      element.nativeElement.scrollIntoView();
    });

  // on route change to 'activities routes', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ( (event.url === '/welcome-activity') ||
         (event.url === '/welcome-personal') ||
          (event.url === '/activity1') ||
          (event.url === '/activity2') ||
          (event.url === '/activity3') ||
          (event.url === '/activity4') ||
          (event.url === '/end-activity') ||
          (event.url === '/activity') ) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }

}
