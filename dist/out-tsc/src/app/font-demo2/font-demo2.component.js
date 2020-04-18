import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let FontDemo2Component = class FontDemo2Component {
    constructor(unleashService) {
        this.unleashService = unleashService;
    }
    ngOnInit() {
        this.unleashService.changeTheme('dark');
    }
};
FontDemo2Component = tslib_1.__decorate([
    Component({
        selector: 'app-font-demo2',
        templateUrl: './font-demo2.component.html',
        styleUrls: ['./font-demo2.component.css']
    })
], FontDemo2Component);
export { FontDemo2Component };
//# sourceMappingURL=font-demo2.component.js.map