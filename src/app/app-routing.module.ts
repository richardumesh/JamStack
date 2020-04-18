import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { FontDemo1Component } from './font-demo1/font-demo1.component';
import { FontDemo2Component } from './font-demo2/font-demo2.component';
import { FontDemo3Component } from './font-demo3/font-demo3.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CallbackComponent } from './callback/callback.component';
import { RosterCbComponent } from './roster-cb/roster-cb.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterInvitLinkComponent } from './register-invit-link/register-invit-link.component';
import {CheckTopicStatusComponent} from './check-topic-status/check-topic-status.component'

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent  },
  { path: 'how-it-works', component: HowItWorksComponent  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lets-get-started', component: LetsGetStartedComponent , canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent , canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'recover-password/:id', component: RecoveryPasswordComponent },
  { path: 'welcome-activity', component: WelcomeActivityComponent },
  { path: 'activity/:key', component: Activity1Component },
  { path: 'callback', component: CallbackComponent },
  { path: 'roster-cb', component: RosterCbComponent },
  { path: 'contact-us', component:ContactUsComponent},
  { path: 'student-register', component:RegisterInvitLinkComponent},
  { path: ':topicId', component:CheckTopicStatusComponent},
 
 { path : 'roster/:topicId', canActivate: [AuthGuard], loadChildren: () => 
 import(`./roster/roster.module`).then(m => m.RosterModule),  },
 {
  path: '**',
  redirectTo: ''
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
