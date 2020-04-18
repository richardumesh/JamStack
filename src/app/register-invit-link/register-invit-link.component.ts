import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UnleashService } from '../unleash.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register-invit-link',
  templateUrl: './register-invit-link.component.html',
  styleUrls: ['./register-invit-link.component.css']
})
export class RegisterInvitLinkComponent implements OnInit {

  regForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder, private unleashService: UnleashService, private router: Router, 
    private route: ActivatedRoute , private auth: AuthService, private toast: ToastrService) {
    this.regForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/)]],
      email: ['', [ Validators.email]],
     // mobileNumber : ['', [Validators.pattern(/^(\+([1]))?([0-9][0-9]{9})$/)]]
      mobileNumber : ['', [Validators.pattern(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/)]]
    }, {validator: this.atLeastOne(Validators.required, ['email','mobileNumber']) });
  }

  ngOnInit() {
    this.unleashService.changeTheme('dark');
    this.unleashService.changeSignup(true);
    this.unleashService.changeLogin(true);
    this.unleashService.postLogin(false);
    this.unleashService.getStartedFlow(true);
    this.unleashService.recPassFlow(true);
  }

  ngOnDestroy() {
    this.unleashService.changeSignup(false);
    this.unleashService.changeLogin(false);
    this.unleashService.postLogin(true);
    this.unleashService.getStartedFlow(false);
    this.unleashService.recPassFlow(false);
  }
  atLeastOne = (validator: ValidatorFn, controls:string[] = null) => (
    group: FormGroup,): ValidationErrors | null => {
        if(!controls){
          controls = Object.keys(group.controls)
        }
        const hasAtLeastOne = group && group.controls && controls
          .some(k => !validator(group.controls[k]));
        return hasAtLeastOne ? null : {
          atLeastOne: true,
        };
    };
  
  registerAccount() {
    this.submitted = true;
     if (this.regForm.valid) {
      this.loading = false;
      this.toast.success("Register Success"); // just for reference, I will remove after api is ready
     }
     else{
       this.loading = false;
       this.toast.error("Invalid Register");
     }
   }
}
