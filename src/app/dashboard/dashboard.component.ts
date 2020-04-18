import { Component, OnInit, EventEmitter, Output, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UnleashService } from '../unleash.service';
import { ChartType, ChartOptions } from 'chart.js';
import * as _ from 'lodash';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  loggedIn = false;
  isDashboard = false;
  archived = false;
  edit = false;
  selectedTopic = <any>{};
  loading = false;
  submitted = false;
  selectedGrade = [];
  options: FormGroup;
  formSubmitted = false;
  dialogref;
  Grades = [
    'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College'
  ];
  editTopic = false;
  archiveDetails: any = [];
  dashboardDetails: any;
  userDetails: any;
  searchText: any;
  cardDetails: any;
  dataCard : any;
  displayData: any;
  sortOrderType: any;
  userLoggedIn: any;
  day: any;
  toBeArchieved;
  currTopicChosen;
  cardExpand = false;
  nameError = false;
  archiveIndex: any;
  rosterList = [];
  studentsList = [];
  dupError;
  selectedTime = '00:00 AM';
  times = [];
  today = new Date();
  timeNow = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); // January is 0!a
  timeSelected : any;
  yyyy = this.today.getFullYear();
  date = this.yyyy + '/' + this.mm + '/' + this.dd;
  selectedDate = new Date(this.date);
  startAt = new Date(this.date);
  minDate = this.today;
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
  year: any;
  DayAndDate: string;
  currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
  userData;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false
    },
    hover: {
      mode: null
    }
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartColors1 = [{
    backgroundColor: ['#FFD769', 'white'],
  }];
  public pieChartColors2 = [{
    backgroundColor: ['rgba(119,181,54,0.73)', 'white'],
  }];
  public pieChartColors3 = [{
    backgroundColor: ['#D95E5E', 'white'],
  }];
  public pieChartDataOpened: number[] = [];
  public pieChartDataCompleted: number[] = [];
  public pieChartPlugins = [{
    beforeDraw(chart, easing) {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const top = chartArea.top; // Use a value of 0 here to include the legend

      ctx.save();
      ctx.fillStyle = 'white';

      ctx.fillRect(chartArea.left, top, chartArea.right - chartArea.left, chartArea.bottom - top);
      ctx.restore();
    }
  }];

  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;
  month: string;
  dateSelected: string;
  validationError: boolean;

  constructor(private unleashService: UnleashService, private router: Router, fb: FormBuilder, private toast: ToastrService,
    private cdRef: ChangeDetectorRef,  @Inject(DOCUMENT) private document: Document) {
    this.options = fb.group({
      name: ['', [Validators.required, Validators.maxLength(140)]],
      grade: ['', [Validators.required]]
    });
    this.userDetails = this.unleashService.getUserDetails();
    this.day = {
      Mon: 'Mon',
      Tue: 'Tue',
      Wed: 'Wed',
      Thu: 'Thu',
      Fri: 'Fri',
      Sat: 'Sat',
      Sun: 'Sun'
    };
  }

  navigateToPage(page, cardNavigateData) {
    if (page === 'lets-get-started') {
      page = '/' + page;
      this.unleashService.profilePageFlow(false);
      this.unleashService.contactUsFlow(false);
      this.router.navigate([page]);
    }
    else if (page === 'roster') {
      localStorage.removeItem('className');
      this.router.navigate([page, cardNavigateData._id]);
    }
  }

  getColor(status) {
    switch (status) {
      case 'Sent':
        return '#4D9558';
      case 'Pending':
        return '#C85656';
      case 'Scheduled':
        return '#FD8A3B';
      case 'Archived':
        return '#5D5D5D';
    }
  }

  ngOnInit() {
    this.archived = false;
    this.loggedIn = true;
    this.isDashboard = true;
    this.unleashService.postLogin(true);
    this.unleashService.dashboardFlow(true);
    this.unleashService.profilePageFlow(false);
    this.unleashService.contactUsFlow(false);
    this.times = this.getTimeArray();
    this.getDashboardData();
    this.unleashService.changeTheme('light');
    this.userLoggedIn = JSON.parse(localStorage.getItem('newUserLoggedinDetails'));
    localStorage.removeItem('className');
  }
  returnArray(data) {
    console.log(data);
    return data.split(',');
  }

  sortData() {
    if (this.sortOrderType !== undefined && this.sortOrderType === 'desc') {
      this.sortOrderType = 'asc';
    } else {
      this.sortOrderType = 'desc';
    }
    let data = this.userData.topics;
    data = _.orderBy(data, ['topicDate'], [this.sortOrderType]);
    this.userData.topics = data;
  }
  getDashboardData() {
    this.loading = true;
    this.unleashService.getProfileDetails().subscribe(response => {
      this.userData = response.result.userDetails;
      for (let i = 0; i < this.userData.topics.length; i++) {
        if (this.userData.topics[i].studentsCount) {
          this.userData.topics[i].openedPercentage = Math.round((this.userData.topics[i].openedCount /
            this.userData.topics[i].studentsCount) * 100);
          this.userData.topics[i].completedPercentage = Math.round((this.userData.topics[i].completedCount /
            this.userData.topics[i].studentsCount) * 100);

        } else {
          this.userData.topics[i].openedPercentage = 0;
          this.userData.topics[i].completedPercentage = 0;
        }
        this.userData.topics[i].chartDataOpened = [this.userData.topics[i].openedPercentage,
        100 - this.userData.topics[i].openedPercentage];
        this.userData.topics[i].chartDataCompleted = [this.userData.topics[i].completedPercentage,
        100 - this.userData.topics[i].completedPercentage];

      }

      console.log(this.userData);
      this.loading = false;
    }, err => {
      this.loading = false;
      this.toast.error('Something went wrong!', 'error !');
    });
  }

  cardOpen(data) {
    data.opened = true;
  }

  cardClose(data) {
    data.opened = false;
  }
  setDuplicate(topic) {
    this.options.reset();
    this.editTopic = false;
    this.selectedTopic = JSON.parse(JSON.stringify(topic));
    this.selectedTopic.topicDate = this.today;
    const remainder = 30 - (this.today.getMinutes() % 30);
    this.selectedTopic.selectedTime = moment(this.today).add(remainder, "minutes");
    this.timeSelected = moment(this.selectedTopic.selectedTime).format("h:mm a");
    this.dateSelected =  moment(this.selectedTopic.topicDate).format("MMM-YYYY-DD");
    this.validateDateTime();
  }
  onTimeChange(time) {
    this.timeSelected = time.value;
    const timeconverted = moment(time.value, 'h:mm a');
    this.selectedTopic.selectedTime = moment(this.selectedTopic.selectedTime).set({
      hour: timeconverted.get('hour'),
      minute: timeconverted.get('minute')
    });
   
    this.validateDateTime();
    this.cdRef.detectChanges();
  }
  sendReminder() {
    this.loading = true;
    this.unleashService.sendReminder(this.currTopicChosen).subscribe((response: any) => {
      if (response.is_success) {
        this.loading = false;
        this.closeModal('remindModal');
        this.toast.info(response.message);
      }
    }, err => {
      this.loading = false;
      this.toast.error('Something went wrong!');
    });
  }
  updateTopic() {
    if (this.options.valid) {
      this.selectedTopic.topicDate = moment(this.selectedTopic.topicDate).set({
        hour: moment(this.selectedTopic.selectedTime).get('hour'),
        minute: moment(this.selectedTopic.selectedTime).get('minute')
      });
      this.loading = true;
      const topic: any = {
        _id: this.selectedTopic._id,
        topicDate: this.selectedTopic.topicDate,
        gradeLevel: this.options.value.grade,
      };
      if (this.selectedTopic.name !== this.options.value.name) {
        topic.name = this.options.value.name;
      }
      this.unleashService.updateTopic(topic).subscribe((response: any) => {
        console.log(response);
        if (response.is_success) {
          this.loading = false;
          this.toast.success(response.message);
          this.closeModal('duplicateModal');
          this.getDashboardData();
        }
      }, err => {
        console.log(err);
        this.loading = false;
        // this.closeModal('duplicateModal');
        this.dupError = err.error.message;
      });
    }
  }
  closeModal(modal) {
    $('#' + modal).modal('hide');
    $('.modal-backdrop').remove();
  }
  copyLink(topic) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.document.location.origin + '/' + topic._id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  validateDateTime() {
    const data = this.dateSelected.split('-');
    const date = data[2] + ' ' + data[1] + ' ' + data[0] + ' ' + this.timeSelected;
    const choosedDate = new Date(date);
    const currentDate = new Date();
    if(currentDate > choosedDate) {
      this.validationError = true;
    }
    else {
      this.validationError = false;
    }
  }


  onEdit(topic) {
    this.dupError = '';
    this.editTopic = true;

    this.selectedTopic = JSON.parse(JSON.stringify(topic));
    this.selectedTopic.selectedTime = topic.topicDate;
    this.timeSelected = moment(this.selectedTopic.selectedTime).format("h:mm a");
    this.dateSelected =  moment(this.selectedTopic.topicDate).format("MMM-YYYY-DD");
    // dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    this.options.patchValue({
      name: this.selectedTopic.name,
      grade: this.selectedTopic.gradeLevel
    });
    this.cdRef.detectChanges();


    // this.edit = true;
    // this.userData.topics[ind].editing = true;
  }

  onSelect(event, ind) {
    this.userData.topics[ind].topicDate = event.value;
  }


  duplicateDateSelect(event) {
    console.log(event);
    this.selectedTopic.topicDate = event.value;
    this.dateSelected =  moment(this.selectedTopic.topicDate).format("MMM-YYYY-DD");
    this.validateDateTime();
    this.cdRef.detectChanges();
  }

  getUnopend(data) {
    this.dataCard = data;
    // $('#remindModal').modal('show');
    this.currTopicChosen = null;
    this.loading = true;
    this.unleashService.getUnopend(data._id).subscribe((response: any) => {
      if (response.is_success) {
        this.loading = false;
        this.studentsList = response.result.result;
        if (this.studentsList.length > 0) {
          this.currTopicChosen = data._id;
        }
      }
    }, err => {
      this.currTopicChosen = null;
      this.loading = false;
      this.toast.error('Something went wrong!');
    });

  }

  onNameChange(event) {
    for (let i = 0; i < this.cardDetails.length; i++) {
      this.cardDetails[i].gradeName = event;
    }
  }

  onSave(data) {
    for (let i = 0; i < this.cardDetails.length; i++) {
      if ((this.cardDetails[i].gradeName.length < 1) || (this.cardDetails[i].gradeName.length > 140)) {
        this.nameError = true;
      } else {
        this.nameError = false;
        this.edit = false;
        this.submitted = true;
      }
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

  ngOnDestroy() {
    this.isDashboard = true;
    this.unleashService.postLogin(false);
    this.unleashService.dashboardFlow(false);
    this.unleashService.profilePageFlow(false);
    this.unleashService.contactUsFlow(false);

  }

  archiveData(id) {
    this.toBeArchieved = id;
  }

  archive() {
    this.loading = true;
    this.unleashService.archive({ topicId: this.toBeArchieved }).subscribe((response: any) => {
      if (response.is_success) {
        this.toast.success('Archived Successfully');
        this.getDashboardData();
      }
    }, err => {
      // this.loading = false;
      this.toast.error('Something went wrong!');
    });
  }
  // getunopend(topicId) {
  //   this.loading = true;
  //   this.unleashService.getUnopend(topicId).subscribe((response: any) => {
  //     console.log(response);
  //     if (response.is_success) {
  //     }
  //   }, err => {
  //     // this.loading = false;
  //     this.toast.error('Something went wrong!');
  //   });
  // }

  restoreArchive(cardData) {
    this.loading = true;
    this.unleashService.restoreArchive(cardData._id).subscribe((response: any) => {
      this.loading = false;
      this.toast.success('Restored Successfully');
      this.goto('dashboard');
    }, err => {
      this.loading = false;
      this.toast.error('Something went wrong!');
    });
  }

  goto(link) {
    if (link === 'dashboard') {
      this.getDashboardData();
      this.archived = false;
    } else if (link === 'archive') {
      this.getArchivedTopics();
      this.archived = true;
    }
  }

  getArchivedTopics() {
    this.loading = true;
    this.unleashService.getArchive().subscribe((response: any) => {
      this.loading = false;
      this.userData.topics = response.result;
    }, err => {
      this.loading = false;
      this.toast.error('Something went wrong!');
    });
  }
  getRoster(topic) {
    this.loading = true;
    this.unleashService.getRoster(topic._id).subscribe((response: any) => {
      if (response.is_success) {
        this.loading = false;
        this.rosterList = response.result.roster;
      }
    }, err => {
      this.loading = false;
      this.toast.error(err.message);
    });
  }

  duplicateTopic() {
    if (this.options.valid) {
      this.selectedTopic.topicDate = moment(this.selectedTopic.topicDate).set({
        hour: moment(this.selectedTopic.selectedTime).get('hour'),
        minute: moment(this.selectedTopic.selectedTime).get('minute')
      });
      this.loading = true;
      const topic = {
        topicId: this.selectedTopic._id,
        topicDate: this.selectedTopic.topicDate,
        name: this.options.value.name,
        gradeLevel: this.options.value.grade,

      };
      this.unleashService.duplicateTopic(topic).subscribe((response: any) => {
        if (response.is_success) {
          this.loading = false;
          this.toast.success(response.message);
          this.closeModal('duplicateModal');
          this.getDashboardData();
        }
      }, err => {
        console.log(err);
        this.loading = false;
        // this.closeModal('duplicateModal');
        this.dupError = err.error.message;
      });
    }

  }
  undoError(event) {
    var k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    this.dupError = null;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));

  }


}
