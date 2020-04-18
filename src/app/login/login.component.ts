import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnleashService } from '../unleash.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { environment}  from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  checkUserData: any;
  passwordError = false;
  signIn = false;
  invalidLogin = false;
  loading = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private unleashService: UnleashService,
    private router: Router,
    private route: ActivatedRoute, private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.checkUserData = this.unleashService.getUserData();
  }

  ngOnInit() {
   this.signIn = true;
   this.unleashService.changeTheme('light');
   this.unleashService.changeLogin(true);
  }

  ngOnDestroy() {
    this.unleashService.changeLogin(false);
  }

  loginUser() {
    this.submitted = true;
    // calling the login api
    if (this.loginForm.valid) {
      this.loading = true;
      const loginPayload = {
        email: this.loginForm.controls.email.value,
        password: btoa(this.loginForm.controls.password.value)  // convert password to base64
       };
          this.auth.login(loginPayload).subscribe(response =>{
          const userDetails = {
            "firstName": response.result.userDetails.firstName,
            "lastName": response.result.userDetails.lastName,
            "email" : response.result.email,
            "token" : response.result.token,
            'loggedInType' : response.result.userDetails.loggedInType,
          }
          this.auth.setUserData(userDetails);
          this.loading = false;
          this.router.navigate(['lets-get-started']);
         },err=>{
           this. loading = false;
           this.invalidLogin = true;
           this.invalidLogin = err.error.message;
         })
    } 
  }
 
  googleAuth2() {  //login through Google Account
     localStorage.setItem('pageVisited', 'login');
    window.location.href = `${environment.code_endpoint}?redirect_uri=${environment.redirect_endpoint}&
    prompt=consent&response_type=code&client_id=${environment.client_id}&scope=${environment.scope}&access_type=${environment.access_type}`;
  }
}
