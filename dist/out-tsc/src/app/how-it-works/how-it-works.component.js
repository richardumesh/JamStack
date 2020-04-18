import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HowItWorksComponent = class HowItWorksComponent {
    constructor(router, unleashService) {
        this.router = router;
        this.unleashService = unleashService;
    }
    navigateToPage(page) {
        this.selectedPage = page;
        page = '/' + page;
        this.router.navigate([page]);
    }
    ngOnInit() {
        this.unleashService.changeTheme('dark');
    }
};
HowItWorksComponent = tslib_1.__decorate([
    Component({
        selector: 'app-how-it-works',
        templateUrl: './how-it-works.component.html',
        styleUrls: ['./how-it-works.component.css']
    })
], HowItWorksComponent);
export { HowItWorksComponent };
//# sourceMappingURL=how-it-works.component.js.map