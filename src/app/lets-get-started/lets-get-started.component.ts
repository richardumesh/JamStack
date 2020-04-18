import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { UnleashService } from '../unleash.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RosterCbComponent } from '../roster-cb/roster-cb.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-lets-get-started',
  templateUrl: './lets-get-started.component.html',
  styleUrls: ['./lets-get-started.component.css']
})
export class LetsGetStartedComponent implements OnInit {
  topicId: any;
  loggedIn = false;
  options: FormGroup;
  selectedGrade = [];
  letsGetStartedFlow = false;
  submitted = false;
  specialChar = true;
  alpha = false;
  loading=false;
  token: any;
  Grades = [
    'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College'
  ];

  constructor(fb: FormBuilder, public unleashService: UnleashService, private router: Router, private auth: AuthService, private toast: ToastrService) {
    this.options = fb.group({
      name: ['', [Validators.required, Validators.maxLength(140)]],
      grade: ['', [Validators.required]]
    });
  }

  omit_special_char(event) {
    var k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  getData(page) {
    this.loading = true;
    const topic = {
      name : this.options.value.name,
      gradeLevel : this.options.value.grade
    };
    this.unleashService.gradeDetails(topic).subscribe(
      data => {
       if(data['is_success'] == true) {
        localStorage.setItem('topicDetails', JSON.stringify(data));
        this.unleashService.storeTopicDetails(data);
        this.loading = false;
        this.router.navigate([page, data['result']['_id']]);
        this.toast.success("Topic Created", 'Success !');
       }
       if(data['is_success'] == false) {
        this.loading = false;
        this.toast.error(data['message'], "error !");
       }
      },
      error => {
        this.loading = false;
        this.toast.error(error.error.message, "error !");
      }
    );
  }


  onFormSubmit(form: NgForm) {
    // console.log(form);
  }

  ngOnInit() {
    this.loggedIn = true;
    this.letsGetStartedFlow = true;
    this.unleashService.showDashboard(true);
    this.unleashService.postLogin(true);
    this.unleashService.getStartedFlow(true);
    this.unleashService.changeTheme('light');
    localStorage.removeItem('className');
  }

  ngOnDestroy() {
    this.letsGetStartedFlow = false;
    this.unleashService.postLogin(false);
    this.unleashService.getStartedFlow(false);
    this.unleashService.showDashboard(false);
  }

}
