import { Component, OnInit , ViewChild , ElementRef, ChangeDetectionStrategy,ChangeDetectorRef , AfterContentChecked} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UnleashService } from '../unleash.service';
import { MustMatch } from './match-function';
import { AuthService } from '../../auth/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit , AfterContentChecked {

  @ViewChild("cancelPasswordModel", { static: false }) cancelPasswordModel : ElementRef;
  loggedIn = false;
  isDashboard = false;
  loading = false;
  changePwdForm: FormGroup;
  editBasicInfoForm: FormGroup;
  title = ['Mr', 'Ms', 'Dr'];
  gender = [
    {
      id: 1,
      name: 'Male'
    },
    {
      id: 2,
      name: 'Female'
    },
    {
      id: 3,
      name: 'Other (Please specify)'
    },
    {
      id: 4,
      name: 'Prefer not to say'
    }
  ];
  ethnicity = [
    {
      id: 1,
      name: 'Asian/Asian American'
    },
    {
      id: 2,
      name: 'Black/African American'
    },
    {
      id: 3,
      name: 'Hispanic/Latino'
    },
    {
      id: 4,
      name: 'Native/American'
    },
    {
      id: 5,
      name: 'White/Caucasian'
    },
    {
      id: 6,
      name: 'Other (Please specify)'
    },
    {
      id: 7,
      name: 'Prefer not to say'
    }
  ];
  education = ['Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College'];
  userLoggedIn: any;
  aboutEdit = false;
  changePassword = false;
  pwdSubmitted = false;
  otherEthnicity = false;
  ethnicityError = false;
  otherGender = false;
  genderError = false;
  profileDetails;
  invalidLogin = false;
  selectedGrade = [];
  email;
  id;

  constructor(fb: FormBuilder, public unleashService: UnleashService, private router: Router,
              private auth: AuthService,  private toast: ToastrService, private cdRef:ChangeDetectorRef) {

      this.changePwdForm = fb.group({
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.pattern(/^(?=.{6,})(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^!&*+=^*()-_?.,"'<>={}~|;:`]).*$/)]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: MustMatch('newPassword', 'confirmPassword') });

      this.editBasicInfoForm = fb.group({
        firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/)]],
        lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$/)]],
        title: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        education: ['', [Validators.required]],
        ethnicity: ['', [Validators.required]],
        differentEthnicity: [''],
        differentGender: ['']
      });
  }

  ngOnInit() {
    this.loggedIn = true;
    this.isDashboard = false;
    this.loading = true;
    this.unleashService.changeTheme('dark');
    this.unleashService.postLogin(true);
    this.unleashService.dashboardFlow(false);
    this.unleashService.profilePageFlow(true);
    this.unleashService.contactUsFlow(false);
    this.aboutEdit = false;
    this.changePassword = false;
   
      this.unleashService.getProfileDetails().subscribe(response => {
        this.loading = false;
        this.profileDetails = response.result.userDetails;
        this.profileDetails.email = response.result.email;
        }, err => {
          this.loading = false;
          this.toast.error("Something went wrong!", "error !");
          this.invalidLogin = true;
          this.invalidLogin = err.error.message;
        });
        this.cdRef.detectChanges();
  }
 
  goToDashboard() {
    this.router.navigate(['/dashboard']);
    this.isDashboard = true;
  }

  basicInfoEdit() {
    const genderReceived = this.gender.filter((gender) => {
      return gender.name === this.profileDetails.gender;
    });
    const ethnicityReceived = this.ethnicity.filter((ethnicity) => {
      return ethnicity.name === this.profileDetails.ethnicity;
    });
    if (genderReceived.length === 0) {
      if(this.profileDetails.gender != '') {
      this.otherGender = true;
      this.editBasicInfoForm.patchValue({
        gender: '3',
        differentGender: this.profileDetails.gender
      });
    }
    } else {
      this.editBasicInfoForm.patchValue({
        gender: this.findGenderByName(this.profileDetails.gender).id
      });
    }
    if (ethnicityReceived.length === 0) {
      if(this.profileDetails.ethnicity != '') {
      this.otherEthnicity = true;
      this.editBasicInfoForm.patchValue({
        ethnicity: '6',
        differentEthnicity: this.profileDetails.ethnicity
      });
    }
    } else {
      this.editBasicInfoForm.patchValue({
        ethnicity: this.findEthnicityByName(this.profileDetails.ethnicity).id
      });
    }
    this.editBasicInfoForm.patchValue({
      firstName: this.profileDetails.firstName,
      lastName: this.profileDetails.lastName,
      title: this.profileDetails.title,
      education: this.profileDetails.education
    });
    this.aboutEdit = true;
  }

  openChangePassword() {
    this.changePassword = true;
  }

  savePassword() {
    this.loading = true;
    this.pwdSubmitted = true;
    if (this.changePwdForm.valid) {
      const passwordsPayload = {
        currentPassword : btoa(this.changePwdForm.value.currentPassword),
        newPassword : btoa(this.changePwdForm.value.newPassword),
      };
      this.auth.resetPwdInProfilePage(passwordsPayload).subscribe(response => {
        this.loading = false;
        this.changePassword = false;
        this.pwdSubmitted = false;
        this.changePwdForm.reset();
        this.toast.success(response.message, 'Success !');
     }, err => {
       this.loading = false;
       this.toast.error("Something went wrong!", "error !");
       this.invalidLogin = true;
       this.invalidLogin = err.error.message;
     });
    } else {
      this.loading = false;
    }
  }
  cancel(event){
     this.changePassword = false;
  }

  basicInfoSubmit() {
    this.loading = true;
    if (this.editBasicInfoForm.valid) {
      const editProfilePayload = {
        userDetails : {
          firstName: this.editBasicInfoForm.value.firstName,
          lastName: this.editBasicInfoForm.value.lastName,
          title: this.editBasicInfoForm.value.title,
          gender: this.editBasicInfoForm.value.gender === '3' ?
          this.editBasicInfoForm.value.differentGender : this.findGender(this.editBasicInfoForm.value.gender).name,
          ethnicity : this.editBasicInfoForm.value.ethnicity === '6' ?
          this.editBasicInfoForm.value.differentEthnicity : this.findEthnicity(this.editBasicInfoForm.value.ethnicity).name,
          education : this.editBasicInfoForm.value.education
        }
      };
      this.unleashService.updateProfileDetails(editProfilePayload).subscribe(response => {
        this.loading = false;
        this.aboutEdit = false;
        this.otherGender = false;
        this.otherEthnicity = false;
        this.profileDetails = response.result.userDetails;
        this.profileDetails.email =  response.result.email;
        let lsData =JSON.parse(localStorage.getItem('newUserLoggedinDetails'));
        lsData['firstName']= response.result.userDetails.firstName;;
        lsData['lastName'] = response.result.userDetails.lastName;
        localStorage.setItem('newUserLoggedinDetails', JSON.stringify(lsData));
     }, err => {
       this.loading = false;
       this.toast.error("Something went wrong!", "error !");
       this.invalidLogin = true;
       this.invalidLogin = err.error.message;
     });
      return false;
    } 
    else {
      this.loading=false;
      this.aboutEdit = true;
    }
  }
  findGender(id) {
    return this.gender.find((gen) => {
      return gen.id == id;
    });
  }
  findGenderByName(name) {
    return this.gender.find((gen) => {
      return gen.name == name;
    });
  }
  findEthnicity(id) {
    return this.ethnicity.find((newEthnicity) => {
      return newEthnicity.id == id;
    });
  }
  findEthnicityByName(name) {
    return this.ethnicity.find((newEthnicity) => {
      return newEthnicity.name == name;
    });
  }

  changeEthnicity(event) {
    if (this.editBasicInfoForm.value.ethnicity === '6') {
      this.editBasicInfoForm.controls.differentEthnicity.setValidators([Validators.required]);
      this.otherEthnicity = true;
    } else {
      this.otherEthnicity = false;
      this.editBasicInfoForm.controls.differentEthnicity.clearValidators();
      this.editBasicInfoForm.controls.differentEthnicity.updateValueAndValidity();
    }
  }

  changeGender(event) {
    if (this.editBasicInfoForm.value.gender === '3') {
      this.editBasicInfoForm.controls.differentGender.setValidators([Validators.required]);
      this.otherGender = true;
    } else {
      this.otherGender = false;
      this.editBasicInfoForm.controls.differentGender.clearValidators();
      this.editBasicInfoForm.controls.differentGender.updateValueAndValidity();
    }
  }
  ngAfterContentChecked() {
    this.loading = false;
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.loading = false;
    this.unleashService.postLogin(false);
    this.unleashService.dashboardFlow(true);
    this.unleashService.profilePageFlow(false);
    this.unleashService.contactUsFlow(true);
  }

}
