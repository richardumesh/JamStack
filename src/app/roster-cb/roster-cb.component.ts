import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { environment}  from '../../environments/environment';
@Component({
  selector: 'app-roster-cb',
  templateUrl: './roster-cb.component.html',
  styleUrls: ['./roster-cb.component.css']
})
export class RosterCbComponent implements OnInit {

  loading = false;

  constructor(  private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    let topic = JSON.parse(localStorage.getItem('topicDetails'));
    const authcode: string = this.route.snapshot.queryParamMap.get('code');
    if (authcode) {
      const config = {
        code: authcode,
        redirect_uri : environment.redirect_endpoint_roster,
        client_id: environment.client_id,
        client_secret : environment.client_secret,
        scope : environment.scope,
        grant_type: environment.grant_type,
        access_type: environment.access_type
      };
      this.auth.getGoogleToken(environment.token_endpoint, config).subscribe(
        res => {
          localStorage.setItem('googleUser', JSON.stringify(res));
          let page = 'roster'
          this.router.navigate([page, topic['result']['_id']]);
          this.loading = false;
        }
      );
    }
  }
}
