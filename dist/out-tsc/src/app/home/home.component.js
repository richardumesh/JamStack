import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HomeComponent = class HomeComponent {
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
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map