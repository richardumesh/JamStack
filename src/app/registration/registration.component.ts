import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnleashService } from '../unleash.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  submitted = false;
  teamsPolicyError = false;
  contactForResearch = false;
  signUp = false;
  emailExist = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder, private unleashService: UnleashService, private router: Router,
    private route: ActivatedRoute, private auth: AuthService, private toast: ToastrService) {
    this.regForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password :['', [ Validators.required, Validators.pattern(/^(?=.{6,})(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^!&*+=^*()-_?.,"'<>={}~|;:`]).*$/)]],
      confirmPassword: ['', [Validators.required]],
      iAgree: [false, Validators.requiredTrue],
      iAllow: [false]
    });
  }

  ngOnInit() {
    this.signUp = true;
    this.unleashService.changeTheme('light');
    this.unleashService.changeSignup(true);  
  }

  ngOnDestroy() {
    this.unleashService.changeSignup(false);
  }

  registerAccount() {
    this.submitted = true;
    if (this.regForm.controls.password.value !== this.regForm.controls.confirmPassword.value) {
      return;
    }
    if (this.regForm.valid) {
      this.loading = true;
      const payload = {
        "email": this.regForm.controls.email.value,
        "password": btoa(this.regForm.controls.password.value),
        "userDetails": {
          "firstName": this.regForm.controls.firstName.value,
          "lastName": this.regForm.controls.lastName.value,
          "contactForResearch": this.regForm.controls.iAllow.value,
          "acceptedTerms": this.regForm.controls.iAgree.value
        }
       }
        this.auth.register(payload).subscribe(response =>{
            if(response.is_success == true){
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
            }
         },err=>{
           this.loading = false;
           this.emailExist = true;
           this.emailExist = err.error.message;
        })
     }
   }

  googleAuth2() {  //register through Google Account
    localStorage.setItem('pageVisited', 'register');
    window.location.href = `${environment.code_endpoint}?redirect_uri=${environment.redirect_endpoint}&
    prompt=consent&response_type=code&client_id=${environment.client_id}&scope=${environment.scope}&access_type=${environment.access_type}`;
  }
}
