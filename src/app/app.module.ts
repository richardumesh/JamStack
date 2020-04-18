import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivityService } from './services/activity.service';
import { UnleashService } from './unleash.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WelcomeActivityComponent } from './activities/welcome-activity/welcome-activity.component';
import { Activity1Component } from './activities/activity1/activity1.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {
  MatExpansionModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  ShowOnDirtyErrorStateMatcher,
  ErrorStateMatcher,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatButtonModule, MatRippleModule, MatTableDataSource
} from '@angular/material';

// import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LetsGetStartedComponent } from './lets-get-started/lets-get-started.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { SharedModule } from './shared.module';
import { FontDemo1Component } from './font-demo1/font-demo1.component';
import { FontDemo2Component } from './font-demo2/font-demo2.component';
import { FontDemo3Component } from './font-demo3/font-demo3.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CallbackComponent } from './callback/callback.component';


import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { GeneralHttpService } from './services/general-http.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { RosterCbComponent } from './roster-cb/roster-cb.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterInvitLinkComponent } from './register-invit-link/register-invit-link.component';
import { CheckTopicStatusComponent } from './check-topic-status/check-topic-status.component';
import { ScullyLibModule } from '@scullyio/ng-lib-v8';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeActivityComponent,
    Activity1Component,
    RegistrationComponent,
    LoginComponent,
    ResetpasswordComponent,
    DashboardComponent,
    // HeaderComponent,
    AboutComponent,
    HowItWorksComponent,
    LetsGetStartedComponent,
    FontDemo1Component,
    FontDemo2Component,
    FontDemo3Component,
    RecoveryPasswordComponent,
    EditProfileComponent,
    CallbackComponent,
    RosterCbComponent,
    ContactUsComponent,
    RegisterInvitLinkComponent,
    CheckTopicStatusComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatIconModule,
    Ng2SearchPipeModule,
    NgSlimScrollModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,

    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    }),

    ScullyLibModule
  ],
  exports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule
  ],
  providers: [ActivityService, UnleashService, GeneralHttpService, AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
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
    },
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],

  bootstrap: [AppComponent]
})
export class AppModule { }