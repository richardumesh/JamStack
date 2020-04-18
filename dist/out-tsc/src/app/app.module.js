import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule, MatInputModule, MatFormFieldModule, MatSelectModule, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
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
import { GeneralHttpService } from './services/general-http.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
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
            ToastrModule.forRoot({
                timeOut: 1700,
                positionClass: 'toast-top-right'
            })
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
            ReactiveFormsModule
        ],
        providers: [ActivityService, UnleashService, GeneralHttpService, AuthService, AuthGuard,
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map