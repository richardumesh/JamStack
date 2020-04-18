import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavigationStart } from '@angular/router';
let AppComponent = class AppComponent {
    constructor(router, element) {
        this.router = router;
        this.element = element;
        this.title = 'unleash-ui';
        this.showHead = false;
        this.scrollUp = this.router.events.subscribe((path) => {
            element.nativeElement.scrollIntoView();
        });
        // on route change to 'activities routes', set the variable showHead to false
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                if ((event.url === '/welcome-activity') ||
                    (event.url === '/welcome-personal') ||
                    (event.url === '/activity1') ||
                    (event.url === '/activity2') ||
                    (event.url === '/activity3') ||
                    (event.url === '/activity4') ||
                    (event.url === '/end-activity') ||
                    (event.url === '/activity')) {
                    this.showHead = false;
                }
                else {
                    this.showHead = true;
                }
            }
        });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map