import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let FontDemo3Component = class FontDemo3Component {
    constructor(unleashService) {
        this.unleashService = unleashService;
    }
    ngOnInit() {
        this.unleashService.changeTheme('dark');
    }
};
FontDemo3Component = tslib_1.__decorate([
    Component({
        selector: 'app-font-demo3',
        templateUrl: './font-demo3.component.html',
        styleUrls: ['./font-demo3.component.css']
    })
], FontDemo3Component);
export { FontDemo3Component };
//# sourceMappingURL=font-demo3.component.js.map