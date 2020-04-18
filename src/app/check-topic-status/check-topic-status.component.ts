import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UnleashService } from '../unleash.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-check-topic-status',
  templateUrl: './check-topic-status.component.html',
  styleUrls: ['./check-topic-status.component.css']
})
export class CheckTopicStatusComponent implements OnInit {
  topicId;
  topicDate;
  showError = false;
  loading = false;
  pageNotFound = false;
  showRegister = false;
  regForm: FormGroup;
  submitted = false;
  constructor(private activatedroute: ActivatedRoute, private route: Router, public unleashService: UnleashService,
  private toast: ToastrService, private formBuilder: FormBuilder, ) {
    this.activatedroute.params.subscribe(params => {
      this.topicId = params.topicId;
      this.regForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        email: [null, [Validators.email]],
        mobileNumber: [null, [Validators.pattern(/^(\+([1]))?([0-9][0-9]{9})$/)]]
      }, { validator: this.atLeastOne(Validators.required, ['email', 'mobileNumber']) });
    });
  }

  ngOnInit() {
    this.loading = true;
    this.unleashService.checkTopicStatus({ topicId: this.topicId }).subscribe(
      (data: any) => {
        this.loading = false;
        if (data.result.length > 0) {
          if(data.result[0].topicDate) {
          const date = moment(data.result[0].topicDate);
          const currdate = moment();
          if (date > currdate) {
            this.showError = true;
            this.topicDate = date;
          } else {
            this.showError = false;
            this.showRegister = true;
          }
        } else {
          // no date available for topic
          this.showError = true;
          this.pageNotFound = true;
        }
        } else {
          //invalid topic id
          this.showError = true;
          this.pageNotFound = true;
        }
      }, err => {
        //invalid topic id
        this.showError = true;
        this.loading = false;
        this.pageNotFound = true;
      }
    );
  }
  atLeastOne = (validator: ValidatorFn, controls: string[] = null) => (
    group: FormGroup, ): ValidationErrors | null => {
    if (!controls) {
      controls = Object.keys(group.controls);
    }
    const hasAtLeastOne = group && group.controls && controls
      .some(k => !validator(group.controls[k]));
    return hasAtLeastOne ? null : {
      atLeastOne: true,
    };
  }

  registerAccount() {
    this.submitted = true;
    if (this.regForm.valid) {
      this.loading = false;
      console.log(this.regForm.value);
      let dataToSend: any = {
        topicId: this.topicId,
        firstName: this.regForm.value.firstName,
        lastName: this.regForm.value.lastName
      };
      if (this.regForm.value.email) {
        dataToSend.emailId = this.regForm.value.email;
      }
      if (this.regForm.value.mobileNumber) {
        dataToSend.phoneNo = this.regForm.value.mobileNumber;
      }
      this.unleashService.studentRegister(dataToSend).subscribe((data: any) => {
        console.log(data);
        if (data.is_success) {
          window.location.href = data.result.redirectUrl;
        } else {
          this.toast.info(data.message);
        }
      },(err) => {
        this.toast.error('Oops something went wrong!!');
      });

      // this.toast.success("Register Success"); // just for reference, I will remove after api is ready
    } else {
      this.loading = false;
      // this.toast.error("Invalid Register");
    }
  }

}
