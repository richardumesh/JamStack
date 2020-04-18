import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UnleashService } from '../../unleash.service';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {
  @Output() loader = new EventEmitter();
  @Input() topicId: any;
  currentTopic: any;
  currentSelection: any;
  futureDate;
  DayAndDate;
  month;
  selectedTime;
  day;
  validationError = true;
  year;

  today = new Date();
  timeNow = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); // January is 0!
  yyyy = this.today.getFullYear();
  date = this.yyyy + '-' + this.mm + '-' + this.dd;
  selectedDate = new Date(this.date);
  startAt = new Date(this.date);
  minDate = this.today;
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
  time: any[];
  allDetails: any;
  selectedItem: any;
  loading: boolean;

  constructor(public unleash: UnleashService, private toast: ToastrService ) { }

  clicked(type) {
    if (type === 'future') {
      this.futureDate = true;
    } else {
      this.futureDate = false;
    }
    if (type === 'now') {
      let time = new Date().getTime();
      let date = new Date(time);
    }
  }

  postDateTime(type) {
    if (type === 'future') {
      const obj = {
        date: this.DayAndDate,
        month: this.month,
        time: this.selectedTime,
        day: this.day,
        year: this.year
      };
      const data = obj.month + ' ' + obj.year + ' ' + obj.time;
      let date = new Date(data);
      this.updateTopicApi(date);
    }
  }

  updateTopicApi(date) {
    let obj = {
      _id : this.topicId,
      topicDate: date
    }
    this.unleash.updateTopic(obj).subscribe(
      data => {
        if(data['is_success'] === true) {
          this.toast.success("", 'Success !');
        }
        else if(data['is_success'] === false) {
          this.toast.error(data['message'], "error !");
        }
      },
      error => {
        this.toast.error(error.error.message, "error !");
      }
    );
  }

   validateDateTime() {
    let newOne = this.month + " " +this.year + " " + this.selectedTime;
    let date = new Date();
    var selecDate = new Date(newOne.toString());
    if(date > selecDate ) {
      this.validationError = true;
    }
    else {
      this.validationError = false; 
    }
  }

  getTime(time) {
      this.selectedItem = time;
      this.selectedTime = time;
      this.validateDateTime();
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

  onSelect(event, type) {
    if (type === 'change') {
      if (event.value) {
        event = event.value;
      }
      const dateString = event.toDateString();
      const dateValue = dateString.split(' ');
      this.month = dateValue[1] + ' ' + dateValue[2];
      this.day = dateValue[0];
      this.allDetails.day = this.day;
      this.allDetails.month = this.month;
      this.validateDateTime();
    } else if (type === 'first') {
      this.selectedDate = event;
      const dateString = event.toDateString();
      const dateValue = dateString.split(' ');
      this.year = dateValue[3];
      this.DayAndDate = dateValue[1] + ' ' + dateValue[2] + ', ' + dateValue[3];
      this.month = dateValue[1] + ' ' + dateValue[2];
      this.day = dateValue[0];
      this.date =   dateValue[1] + ' ' + dateValue[2];
      this.validateDateTime();
    }
  }

  ngOnInit() {
    /*Fututure date selecting adjust to 30min:
    Example : if current time is 9:45, show 10:00,
    if current time is 9:05, show 9:30.
    */
    let now = this.date + " "  + this.timeNow;
    const start = moment(now.toString());
    const remainder = 30 - (start.minute() % 30);
    const dateTime = moment(start).add(remainder, "minutes").format("h:mm a");
    this.selectedTime = dateTime;
    setTimeout(() => {
      this.loading = false;
      this.loader.emit(this.loading);
    }, 100);
    this.onSelect(this.today, 'first');
    this.currentTopic = JSON.parse(localStorage.getItem('topicDetails'));
    const times = this.getTimeArray();
    this.DayAndDate = this.date;
    this.time = times;
    this.date = String (this.selectedDate.getDate()).padStart(2, '0');
  }

}
