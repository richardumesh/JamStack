import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterComponent } from './roster/roster.component';
import { RosterRoutingModule } from './roster-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FileUploadModule } from 'ng2-file-upload';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule,   MatButtonModule,MatRippleModule } from '@angular/material';
import { ExcelService } from './excel.service';
import { User } from './User';

import {MatTableModule} from '@angular/material/table';
import { CdkTableModule} from '@angular/cdk/table';
import {MatSelectModule} from '@angular/material/select';
// import {  HeaderComponent} from '../header/header.component';
import { SharedModule } from '../shared.module';
import { MatDatepickerModule, MatNativeDateModule, MatGridListModule } from '@angular/material';
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { MatPaginatorModule, MatProgressSpinnerModule,  MatSortModule } from '@angular/material';


import { SelectDateComponent } from './select-date/select-date.component';
import { BuildRosterComponent } from './build-roster/build-roster.component';
import { SendActivityComponent } from './send-activity/send-activity.component';
@NgModule({
  declarations: [RosterComponent, SelectDateComponent, BuildRosterComponent, SendActivityComponent,
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
    NgSlimScrollModule, 
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule, 
    CdkTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule
  ],
  providers: [ExcelService,User, 
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
export class RosterModule { }
