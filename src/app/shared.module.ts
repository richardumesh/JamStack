import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UnleashService} from './unleash.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
 imports:      [
     CommonModule,
     RouterModule,
     MatMenuModule,
     MatButtonModule ],
 declarations: [ HeaderComponent , FooterComponent ],
 exports:      [ HeaderComponent,FooterComponent,
                 CommonModule, FormsModule ],
 providers: [ UnleashService ]
})
export class SharedModule { }