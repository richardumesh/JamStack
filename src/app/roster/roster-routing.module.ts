import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { RosterComponent } from './roster/roster.component';

const routes: Routes = [
    { path: '', component: RosterComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class RosterRoutingModule { }
