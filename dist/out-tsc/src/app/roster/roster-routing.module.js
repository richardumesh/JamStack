import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RosterComponent } from './roster/roster.component';
const routes = [
    { path: '', component: RosterComponent },
];
let RosterRoutingModule = class RosterRoutingModule {
};
RosterRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], RosterRoutingModule);
export { RosterRoutingModule };
//# sourceMappingURL=roster-routing.module.js.map