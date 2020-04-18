import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster/roster.component';
import { RosterRoutingModule } from './roster-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FileUploadModule } from 'ng2-file-upload';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { ExcelService } from './excel.service';
import { MatSelectModule } from '@angular/material/select';
// import {  HeaderComponent} from '../header/header.component';
import { SharedModule } from '../shared.module';
import { MatDatepickerModule, MatNativeDateModule, MatGridListModule } from '@angular/material';
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
let RosterModule = class RosterModule {
};
RosterModule = tslib_1.__decorate([
    NgModule({
        declarations: [RosterComponent,
        ],
        imports: [
            SharedModule,
            CommonModule,
            RosterRoutingModule,
            MatSelectModule,
            MatStepperModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            FileUploadModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatGridListModule,
            NgSlimScrollModule
        ],
        providers: [ExcelService,
            {
                provide: SLIMSCROLL_DEFAULTS,
                useValue: {
                    alwaysVisible: false,
                    gridOpacity: '0.2',
                    barOpacity: '0.5',
                    gridBackground: '#c2c2c2',
                    gridWidth: '6',
                    gridMargin: '2px 2px',
                    barBackground: '#2C3E50',
                    barWidth: '3',
                    barMargin: '2px 2px'
                }
            }
        ]
    })
], RosterModule);
export { RosterModule };
//# sourceMappingURL=roster.module.js.map