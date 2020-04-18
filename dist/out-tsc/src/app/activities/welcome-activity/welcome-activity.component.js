import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let WelcomeActivityComponent = class WelcomeActivityComponent {
    constructor(router) {
        this.router = router;
        this.showScreen2 = false;
    }
    ngOnInit() {
    }
    nextActivity() {
        this.router.navigate(['/activity1']);
    }
};
WelcomeActivityComponent = tslib_1.__decorate([
    Component({
        selector: 'app-welcome-activity',
        templateUrl: './welcome-activity.component.html',
        styleUrls: ['./welcome-activity.component.css'],
    })
], WelcomeActivityComponent);
export { WelcomeActivityComponent };
//# sourceMappingURL=welcome-activity.component.js.map