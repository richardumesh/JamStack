import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { WelcomeActivityComponent } from './activities/welcome-activity/welcome-activity.component';
import { Activity1Component } from './activities/activity1/activity1.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LetsGetStartedComponent } from './lets-get-started/lets-get-started.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CallbackComponent } from './callback/callback.component';
const routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'lets-get-started', component: LetsGetStartedComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
    { path: 'reset-password', component: ResetpasswordComponent },
    { path: 'recover-password', component: RecoveryPasswordComponent },
    { path: 'welcome-activity', component: WelcomeActivityComponent },
    { path: 'activity1', component: Activity1Component },
    { path: 'callback', component: CallbackComponent },
    { path: 'roster', canActivate: [AuthGuard], loadChildren: () => import(`./roster/roster.module`).then(m => m.RosterModule), },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map