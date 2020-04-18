import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let FontDemo1Component = class FontDemo1Component {
    constructor(unleashService) {
        this.unleashService = unleashService;
    }
    ngOnInit() {
        this.unleashService.changeTheme('dark');
    }
};
FontDemo1Component = tslib_1.__decorate([
    Component({
        selector: 'app-font-demo1',
        templateUrl: './font-demo1.component.html',
        styleUrls: ['./font-demo1.component.css']
    })
], FontDemo1Component);
export { FontDemo1Component };
//# sourceMappingURL=font-demo1.component.js.map