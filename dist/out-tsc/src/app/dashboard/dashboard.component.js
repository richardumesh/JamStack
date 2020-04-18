import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { Validators } from '@angular/forms';
let DashboardComponent = class DashboardComponent {
    constructor(unleashService, router, fb) {
        this.unleashService = unleashService;
        this.router = router;
        this.loggedIn = false;
        this.isDashboard = false;
        this.archived = false;
        this.edit = false;
        this.selectedTopic = {};
        this.submitted = false;
        this.selectedGrade = [];
        this.formSubmitted = false;
        this.Grades = [
            'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College'
        ];
        this.archiveDetails = [];
        this.cardExpand = false;
        this.nameError = false;
        this.studentsList = [
            {
                id: 1,
                name: 'John',
                phone: 9876543212,
                email: 'john@test.com'
            },
            {
                id: 2,
                name: 'Rose',
                phone: 8976543215,
                email: 'Rose@test.com'
            },
            {
                id: 3,
                name: 'Reio',
                phone: 8976543215,
                email: 'Reioe@test.com'
            },
            {
                id: 4,
                name: 'Leo',
                phone: 8976543215,
                email: 'Leo@test.com'
            }
        ];
        this.selectedTime = '00:00 AM';
        this.times = [];
        this.today = new Date();
        this.timeNow = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
        this.dd = String(this.today.getDate()).padStart(2, '0');
        this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); // January is 0!a
        this.timeSelected = 'testing';
        this.yyyy = this.today.getFullYear();
        this.date = this.yyyy + '/' + this.mm + '/' + this.dd;
        this.selectedDate = new Date(this.date);
        this.startAt = new Date(this.date);
        this.minDate = this.today;
        this.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
        this.currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
        this.pieChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false
            },
            hover: {
                mode: null
            }
        };
        this.pieChartType = 'pie';
        this.pieChartLegend = false;
        this.pieChartColors1 = [{
                backgroundColor: ['#FFD769', 'white'],
            }];
        this.pieChartColors2 = [{
                backgroundColor: ['rgba(119,181,54,0.73)', 'white'],
            }];
        this.pieChartColors3 = [{
                backgroundColor: ['#D95E5E', 'white'],
            }];
        this.pieChartPlugins = [{
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
    navigateToPage(page) {
        page = '/' + page;
        this.router.navigate([page]);
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
    computeCardDetails() {
        this.dashboardDetails = this.unleashService.getcardDetails();
        this.cardDetails = this.dashboardDetails;
        const array = [];
        console.log(this.cardDetails);
        // for (let i = 0; i < this.cardDetails.length; i++) {
        //   if (this.cardDetails[i].schedulingType === 'now') {
        //     this.cardDetails[i].status = 'Sent';
        //     this.cardDetails[i].openedData = [92, 8];
        //     this.cardDetails[i].completed = [11, 88];
        //     this.cardDetails[i].day = this.day[this.cardDetails[i].day];
        //   } else if (this.cardDetails[i].schedulingType === 'dont_know') {
        //     this.cardDetails[i].status = 'Pending';
        //   } else if (this.cardDetails[i].schedulingType === 'future') {
        //     this.cardDetails[i].status = 'Scheduled';
        //   } else if (this.cardDetails[i].schedulingType === 'delete') {
        //     this.cardDetails[i].status = 'Archived';
        //   }
        // }
    }
    ngOnInit() {
        this.archived = false;
        this.loggedIn = true;
        this.isDashboard = true;
        this.unleashService.postLogin(true);
        // this.unleashService.dashboardFlow(true);
        this.times = this.getTimeArray();
        // this.computeCardDetails();
        this.getDashboardData();
        this.unleashService.changeTheme('light');
        this.userLoggedIn = JSON.parse(localStorage.getItem('newUserLoggedinDetails'));
    }
    returnArray(data) {
        console.log(data);
        return data.split(',');
    }
    sortData() {
        if (this.sortOrderType !== undefined && this.sortOrderType === 'asc') {
            this.sortOrderType = 'desc';
        }
        else {
            this.sortOrderType = 'asc';
        }
        let data = this.cardDetails;
        data = _.orderBy(data, ['gradeName'], [this.sortOrderType]);
        this.cardDetails = data;
    }
    getDashboardData() {
        this.unleashService.getProfileDetails().subscribe(response => {
            console.log(response);
            this.userData = response.result.userDetails;
            // this.loading = false;
            // this.profileDetails = response.result.userDetails;
            // this.profileDetails.email = response.result.email;
        }, err => {
            // this.loading = false;
            // this.toast.error("Something went wrong!", "error !");
        });
    }
    cardOpen(i) {
        console.log(i);
        // console.log(this.cardDetails)
        this.userData.topics[i].opened = true;
    }
    cardClose(i) {
        console.log(i);
        this.userData.topics[i].opened = false;
    }
    setDuplicate(topic) {
        this.selectedTopic = JSON.parse(JSON.stringify(topic));
    }
    sendReminder() {
        console.log('Reminder sent');
    }
    onEdit(ind) {
        console.log(ind);
        // this.edit = true;
        this.userData.topics[ind].editing = true;
    }
    onSelect(event, ind) {
        this.userData.topics[ind].topicDate = event.value;
        // if (type === 'change') {
        //   if (event.value) {
        //     event = event.value;
        //   }
        //   const dateString = event.toDateString();
        //   const dateValue = dateString.split(' ');
        //   this.month = dateValue[1] + ' ' + dateValue[2];
        //   this.day = dateValue[0];
        //   this.year = dateValue[3];
        //   for (let i = 0; i < this.cardDetails.length; i++) {
        //   this.cardDetails[i].day = this.day;
        //   this.cardDetails[i].month = this.month;
        //   this.cardDetails[i].year = this.year;
        //   this.cardDetails[i].date = this.cardDetails[i].month + ',' + this.cardDetails[i].year;
        //   }
        //   return this.cardDetails;
        // } else if (type === 'first') {
        //   this.selectedDate = event;
        //   const dateString = event.toDateString();
        //   const dateValue = dateString.split(' ');
        //   this.year = dateValue[3];
        //   this.DayAndDate = dateValue[1] + ' ' + dateValue[2] + ', ' + dateValue[3];
        //   this.month = dateValue[1] + ' ' + dateValue[2];
        //   this.day = dateValue[0];
        // }
    }
    duplicateDateSelect(event) {
        console.log(event);
        this.selectedTopic['fulldate'] = event.value;
    }
    onNameChange(event) {
        for (let i = 0; i < this.cardDetails.length; i++) {
            this.cardDetails[i].gradeName = event;
        }
    }
    onSave(data) {
        console.log(data);
        for (let i = 0; i < this.cardDetails.length; i++) {
            if ((this.cardDetails[i].gradeName.length < 1) || (this.cardDetails[i].gradeName.length > 140)) {
                this.nameError = true;
            }
            else {
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
    }
    archiveData(data) {
        // this.archiveIndex = i;
        let da;
        this.unleashService.archive(data).subscribe(response => {
            console.log(response);
            // this.userData = response.result.userDetails;
            // this.loading = false;
            // this.profileDetails = response.result.userDetails;
            // this.profileDetails.email = response.result.email;
        }, err => {
            // this.loading = false;
            // this.toast.error("Something went wrong!", "error !");
        });
    }
    archive() {
        const toArchive = this.cardDetails[this.archiveIndex];
        toArchive.status = 'Archived';
        toArchive.schedulingType = 'delete';
        this.archiveDetails.push(this.cardDetails[this.archiveIndex]);
        this.dashboardDetails.splice(this.archiveIndex, 1);
        this.goto('archive');
    }
    restoreArchive(cardData, i) {
        const restoreData = cardData;
        restoreData.status = 'Pending';
        restoreData.schedulingType = 'dont_know';
        this.dashboardDetails.push(restoreData);
        this.archiveDetails.splice(i, 1);
        this.goto('dashboard');
    }
    goto(link) {
        if (link === 'dashboard') {
            this.cardDetails = this.dashboardDetails;
            this.archived = false;
        }
        else if (link === 'archive') {
            this.cardDetails = this.archiveDetails;
            this.archived = true;
        }
    }
    onFormSubmit(form) {
        console.log(form);
    }
    getData() {
        this.cardDetails.push(this.selectedTopic);
    }
};
DashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map