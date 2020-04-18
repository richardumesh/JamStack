import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnleashService } from '../unleash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit, OnDestroy {

  recoverpassForm: FormGroup;
  submitted = false;
  signIn = false;
  showSuccessMsg = false;
  loading=false;
  token;
  recoverMsg = '';
  recovertext= false;

  constructor(private formBuilder: FormBuilder, private unleashService: UnleashService,
    private route: ActivatedRoute ,private router: Router, private auth: AuthService,) {

    this.recoverpassForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.pattern(/^(?=.{6,})(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^!&*+=^*()-_?.,"'<>={}~|;:`]).*$/)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.unleashService.changeTheme('light');
    this.unleashService.recPassFlow(true);
    this.route.params.subscribe(
      data => {
        this.token = data.id;
      }
    )
  }
  recoverpassword() {
    this.submitted = true;
    if (this.recoverpassForm.valid) {
      if (this.recoverpassForm.controls.password.value === this.recoverpassForm.controls.confirmPassword.value) { 
        this.loading = true;
        const recoveryPwdPayload ={
          "token": this.token,
          "newPassword": btoa(this.recoverpassForm.controls.password.value)
         }
        this.auth.recoverpassword(recoveryPwdPayload).subscribe(response =>{
          if(response.is_success == true){
            this.loading = false;
            this.showSuccessMsg = true;
            this.recovertext = true;
            this.recoverMsg = response.message;
          }
        },err=>{
          this.loading = false;
          this.recovertext = true;
          this.recoverMsg = err.error.message;
        })
      }
    }
  }

  ngOnDestroy() {
    this.unleashService.recPassFlow(false);
  }
}
