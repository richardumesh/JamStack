import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { environment}  from '../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  emailExist=false;
  invalidLogin = false;
  loading;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router, private toast: ToastrService
  ) { }

  ngOnInit() {
    this.loading = true;
    const authcode: string = this.route.snapshot.queryParamMap.get('code');
    this.route.queryParams.subscribe(params => {
     });
    if (authcode) {
      const config = {
        code: authcode,
        redirect_uri : environment.redirect_endpoint,
        client_id: environment.client_id,
        client_secret : environment.client_secret,
        scope : environment.scope,
        grant_type: environment.grant_type,
        access_type: environment.access_type
      };
      //  hitting the Google endpoint (access_token)
      this.auth.getGoogleToken(environment.token_endpoint, config).subscribe(res => {
        localStorage.setItem('googleUser', JSON.stringify(res));
      //get the Google User profile details
       this.auth.getProfile(environment.profile_endpoint + '/me', res).subscribe(profile => {
        const googlePayload = {
          "email": profile.emailAddress,
          "userDetails" : {
              "firstName": profile.name.givenName, // Google User first_name
              "lastName": profile.name.familyName ? profile.name.familyName : '',  // Google User last_name
              "googleAT" : res.id_token, //id_token provided by Google after user Authenticated
              "contactForResearch": true,
              "acceptedTerms":true
          }
         }
        // Register with Google account
        this.auth.register(googlePayload).subscribe(response =>{
           if(response.is_success == true){
            const userDetails = {
              "firstName": response.result.userDetails.firstName,
              "lastName": response.result.userDetails.lastName,
              "email" : response.result.email,
              "token" : response.result.token,
              'loggedInType' : response.result.userDetails.loggedInType,
            }
            this.auth.setUserData(userDetails);
            this.loading=false;
             this.router.navigate(['lets-get-started']);
            }
         },
         err=>{
          this.loading=false;
            const nav = localStorage.getItem('pageVisited');
            if(nav === 'register'){
              this.router.navigate(['/registration']);
            }
            else {
              this.router.navigate(['/login']);
            }
            this.toast.error(err.error.message, 'error !');
        })
       });
      });
    } 
  }
}
