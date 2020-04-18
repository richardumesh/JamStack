import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnleashService } from '../unleash.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit, OnDestroy {

  resetpassForm: FormGroup;
  submitted = false;
  signIn = false;
  loading = false;
  successMessage = false;
  resetMessage = '';

  constructor(private formBuilder: FormBuilder, private unleashService: UnleashService,
     private auth: AuthService, private router: Router,) {

    this.resetpassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.unleashService.changeTheme('light');
    this.unleashService.changeLogin(true);
  }

  resetPassword() {
    this.submitted = true;
    if (this.resetpassForm.valid) {
      this.loading = true;
      const resetPwdPayload ={
        "email":this.resetpassForm.controls.email.value,
       }
       this.auth.resetpassword(resetPwdPayload).subscribe(response =>{
        if(response.is_success == false){
          this.loading = false;
          this.successMessage = true;
          this.resetMessage = response.message;
         // this.router.navigate(['login']);
        }
     },err=>{
      this.loading = false;
      this.successMessage = true;
      this.resetMessage = err.error.message;
    })
    }
  }

  ngOnDestroy() {
    this.unleashService.changeLogin(false);
  }
}
