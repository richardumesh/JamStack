import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UnleashService } from './unleash.service';
let SharedModule = class SharedModule {
};
SharedModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule,
            MatMenuModule,
            MatButtonModule
        ],
        declarations: [HeaderComponent],
        exports: [HeaderComponent,
            CommonModule, FormsModule],
        providers: [UnleashService]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map