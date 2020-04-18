import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UnleashService } from '../../unleash.service';
import {FormControl} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-send-activity',
  templateUrl: './send-activity.component.html',
  styleUrls: ['./send-activity.component.css'],
})
export class SendActivityComponent implements OnInit {

  @Input() topicId: any;
  @Input() reviewDetails: any;
  selected: string[];
  grade = new FormControl();
  validationError = false;
  Grades = [
    'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College'
  ];

  @Output() rosterData = new EventEmitter();

  roster: any;
  times: any[];
  timeSelected: any;
  selectedTime: string;
  loading: boolean;
  loader: any;
  dateandTimeChanged = false;
  update: Date;
  currentDate: Date;
  date: string;
  ivitationLink: boolean;
  constructor(
    public unleash: UnleashService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  onTimeChange(event) {
    this.selectedTime = event;
    this.dateandTimeChanged = true;
    this.validateDateTime();
  }

  navigateToPage(type) {
    if (this.dateandTimeChanged) {
      const obj = {
        _id: this.topicId,
        topicDate: this.update
      };
      this.unleash.updateTopic(obj).subscribe(
        data => {
          if (data['is_success'] === true) {
            if(type === 'send') {
              this.sendNotification();
            } else if (type === 'schedule') {
              this.scheduleNotification();
            } else if (type === 'invitationLink') {
              this.scheduleInvitationLink();
            }
          } else if (data['is_success'] === false) {
            this.toast.error(data['message'], "error !");
          }
        },
        error => {
          this.toast.error(error.error.message, "error !");
        }
      );
    } else {
      if (type === 'send') {
        this.sendNotification();
      } else if (type === 'schedule') {
        this.scheduleNotification();
      } else if (type === 'invitationLink') {
        this.scheduleInvitationLink();
      }
    }
  }
  scheduleNotification() {
    this.unleash.scheduleNotification(this.topicId).subscribe(
      (data: any) => {
        if (data.is_success === true) {
          this.router.navigate(['dashboard']);
        } else if (data.is_success === false) {
          this.toast.error(data.message, 'error !');
        }
      }, error => {
        this.toast.error(error.error.message, 'error !');
      }
    );
  }

  scheduleInvitationLink() {
    this.unleash.scheduleInvitationLink(this.topicId).subscribe(
      (data: any) => {
        if (data.is_success === true) {
          this.router.navigate(['dashboard']);
        } else if (data.is_success === false) {
          this.toast.error(data.message, 'error !');
        }
      }, error => {
        this.toast.error(error.error.message, 'error !');
      }
    );
  }
  sendNotification() {
    this.unleash.sendNotification(this.topicId).subscribe(
      data => {
        if (data['is_success'] === true) {
          this.toast.success(data['message'], 'success !');
          this.router.navigate(['dashboard']) 
        } else {
          this.toast.error(data['message'], "error !");
        }
      }, error => {
        this.toast.error(error.error.message, "error !");
      }
    )
  }

  constructRoster(roster) {
    if (roster.topicDate) {
      var date = moment(roster.topicDate).format('DD');
      var month = moment(roster.topicDate).format('MMM');
      var year = moment(roster.topicDate).format('YYYY');
      var day = moment(roster.topicDate).format('ddd');
    }
    this.selectedTime = moment(roster.topicDate).format("h:mm a");
    this.roster = {
      'name': roster.name ? roster.name : null,
      'day': day ? day : null,
      'month': month ? month : null,
      'year': year ? year : null,
      'date': date ? date : null,
      'class': roster.classroomName ? roster.classroomName : null,
      'groupName': roster.name ? roster.name : null,
      'grade': roster.gradeLevel
    }
  }

  getTimeArray() {
    const x = 30; // minutes interval
    const times = []; // time array
    let tt = 0; // start time
    const ap = ['AM', 'PM']; // AM-PM

    // loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i++) {
      const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      const mm = (tt % 60); // getting minutes of the hour in 0-55 format
      times[i] = ('0' + (hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2) + ' ' + ap[Math.floor(hh / 12)];
      tt = tt + x;
    }
    return times;
  }

  validateDateTime() {
    this.date = this.roster.month + ' ' + this.roster.year + ' ' + this.roster.date + ' ' + this.selectedTime;
    this.currentDate = new Date();
    this.update = new Date(this.date);
    if (this.currentDate > this.update) {
      this.validationError = true;
    } else {
      this.validationError = false;
    }
  }

  onSelect(event, type) {
    if (type === 'change') {
      if (event.value) {
        event = event.value;
      }
      this.dateandTimeChanged = true;
      const dateString = event.toDateString();
      const dateValue = dateString.split(' ');
      let month = dateValue[1];
      let day = dateValue[0];
      let date = dateValue[2];
      this.roster.day = day;
      this.roster.month = month;
      this.roster.date = date;
      this.validateDateTime();
    }
  }

  ngOnInit() {
    this.unleash.getDetails.subscribe(status => {
      if (status) {
        this.unleash.getReviewDetails(this.topicId).subscribe(
          data => {
            this.times = this.getTimeArray();
            if (data['is_success'] === true) {
              let roster = data['result'];
              let studentList = data['result']['roster'];
              if(roster.roster.length === 0) {
                this.ivitationLink = true;
              }
              else {
                this.ivitationLink = false;
              }
              this.rosterData.emit(studentList);
              this.constructRoster(roster);
            } else if(data['is_success'] === false) {
              this.toast.error(data['message'], "error !");
            }
          }, error => {
            this.toast.error(error.error.message, "error !");
          }
        );
      }
    });
  }
}
