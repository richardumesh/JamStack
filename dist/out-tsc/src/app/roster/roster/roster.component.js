import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
let RosterComponent = class RosterComponent {
    // tslint:disable-next-line: variable-name
    constructor(unleashService, _formBuilder, fb, excelService, unleash, router, el, auth) {
        this.unleashService = unleashService;
        this._formBuilder = _formBuilder;
        this.excelService = excelService;
        this.unleash = unleash;
        this.router = router;
        this.el = el;
        this.auth = auth;
        this.loggedIn = false;
        this.letsGetStartedFlow = false;
        this.fileUpload = false;
        this.uploader = new FileUploader({});
        this.slecteGoogleClass = false;
        this.now = false;
        this.futureDate = false;
        this.future = false;
        this.dont_know = false;
        this.send_link = false;
        this.linkCopied = false;
        this.link_text = 'https://unleash.app/hgywf';
        this.buildRosterPage = true;
        this.googlePage = false;
        this.beforeSelectClass = true;
        this.afterSelectClass = false;
        this.className = false;
        this.fileToUpload = '';
        this.googleClassRoom = false;
        this.sendlink = false;
        this.selectedClassName = '';
        this.fileName = '';
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
        this.nowGoogleClass = false;
        this.nowGoogleSheet = false;
        this.nowSendLInk = false;
        this.futureGoogleClass = false;
        this.futureGoogleSheet = false;
        this.futureSendLink = false;
        this.dknowGoogleClass = false;
        this.dknowGoogleSheet = false;
        this.dknowSendLink = false;
        this.activity = [{
                type: 'multiselect',
                showSelectedOptions: false,
                select: {
                    min: 2,
                    max: 3,
                    dataOptions: [{
                            id: 1,
                            text: 'Good at Art',
                            image: 'pencil',
                            clicked: false
                        },
                        {
                            id: 2,
                            text: 'Belonging to a social group',
                            image: 'music',
                            clicked: false
                        },
                        {
                            id: 3,
                            text: 'Being creative',
                            image: 'pencil',
                            clicked: false
                        },
                        {
                            id: 4,
                            text: 'Listening to music',
                            image: 'music',
                            clicked: false
                        },
                        {
                            id: 5,
                            text: 'Being independent',
                            image: 'pencil',
                            clicked: false
                        },
                        {
                            id: 6,
                            text: 'Playing music',
                            image: 'music',
                            clicked: false
                        },
                        {
                            id: 7,
                            text: 'Living in the moment',
                            image: 'clock-o',
                            clicked: false
                        },
                        {
                            id: 8,
                            text: 'Following politics or government',
                            image: 'pencil',
                            clicked: false
                        }
                    ],
                },
                question: 'What are your personal values?',
                label1: 'What\'s most important to you?',
                label2: '',
                label3: 'Remember, there are no right or wrong answers to any of these questions.'
            },
            {
                type: 'text',
                showSelectedOptions: true,
                question: '',
                label1: 'Think about times when these values were very important to you. Describe why these values are important to you.',
                label2: 'Focus on your thoughts and feelings and dont worry about spelling and how its written.',
                textArea: 'yes',
            },
            {
                type: 'yesno',
                showSelectedOptions: true,
                question: 'The Things I Value',
                questionsList: [{
                        id: 0,
                        question: 'In general, I try to live up to these things.',
                        ans: null
                    },
                    {
                        id: 1,
                        question: 'These things are an important part of who I am.',
                        ans: null
                    },
                    {
                        id: 2,
                        question: 'I care about these things.',
                        ans: null
                    }
                ],
                options: ['Yes', 'No']
            },
            {
                type: 'hardcode',
            }
            // {
            //   type: 'savedData',
            //   showSelectedOptions:true,
            //   question: 'My personal values',
            //   label1: 'I\'m all done.'
            // },
            // {
            //   type: 'endActivity',
            //   showSelectedOptions: true,
            //   question: 'Great Job!',
            //   label1: 'Your activity is complete.',
            // }
        ];
        this.availClassRooms = [{
                gmail: 'kaeyama@gmail.com',
            },
            {
                gmail: 'kaeyaclass@gmail.com'
            },
            {
                gmail: 'thisiskaeya@gmail.com'
            }
        ];
        // tslint:disable-next-line: indent
        this.data = [{
                'Student First Name': 'John',
                'Student Last Name': 'Doe',
                'Mobile Number': '+1-333-333-33333',
                'Email ID': 'JohnDoe1@Agiliztech.com'
            },
        ];
        this.title = 'ng-calendar-demo';
        this.today = new Date();
        this.timeNow = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
        this.dd = String(this.today.getDate()).padStart(2, '0');
        this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); // January is 0!
        this.yyyy = this.today.getFullYear();
        this.date = this.yyyy + '/' + this.mm + '/' + this.dd;
        this.selectedDate = new Date(this.date);
        this.startAt = new Date(this.date);
        // minDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
        this.minDate = this.today;
        this.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
        this.myDateFilter = (d) => {
            const day = d.getDay();
            // Prevent Saturday anda Sunday from being selected.
            return day !== 0 && day !== 6;
        };
        this.classroom = {
            name: '',
            grade: ''
        };
        this.options = fb.group({
            name: ['', [Validators.required]],
            grade: ['', [Validators.required]],
        });
    }
    stepClicker(type) {
        console.log(type);
    }
    copyText() {
        console.log(this.link_text);
        this.linkCopied = true;
    }
    onSelect(event, type) {
        console.log(event);
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
        }
        else if (type === 'first') {
            this.selectedDate = event;
            const dateString = event.toDateString();
            const dateValue = dateString.split(' ');
            this.year = dateValue[3];
            // let month = dateValue[1];
            // let day = dateValue[2];
            // this.currentDate = month
            this.DayAndDate = dateValue[1] + ' ' + dateValue[2] + ', ' + dateValue[3];
            console.log(this.DayAndDate);
            this.month = dateValue[1] + ' ' + dateValue[2];
            this.day = dateValue[0];
        }
    }
    postDateTime() {
        const obj = {
            date: this.DayAndDate,
            month: this.month,
            time: this.selectedTime,
            day: this.day,
            year: this.year
        };
        this.unleash.postdate(obj);
    }
    selectTime(time) {
        console.log(time);
    }
    navigateToPage(page) {
        // let key = 'details';
        const details = this.allDetails;
        // let array = [];
        // array.push(details);
        localStorage.setItem('details', JSON.stringify(details));
        console.log(this.allDetails);
        page = '/' + page;
        this.router.navigate([page]);
    }
    clicked(type) {
        console.log(type);
        if (type === 'future') {
            this.futureDate = true;
        }
        else {
            this.futureDate = false;
        }
        if (type === 'now') {
            this.postDateTime();
        }
        this.unleash.postScheduling(type);
    }
    getTime(time) {
        console.log(time);
        this.selectedItem = time;
        this.selectedTime = time;
    }
    selectImage(files) {
        this.fileToUpload = files.target.files[0].name;
    }
    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.data, 'Unleash Google Sheet');
    }
    getAllDetails() {
        const scheduling = this.unleash.getScheduling();
        if (scheduling === 'now') {
            this.now = true;
        }
        if (scheduling === 'future') {
            this.future = true;
        }
        if (scheduling === 'dont_know') {
            this.dont_know = true;
        }
        if (this.buildType === 'sendlink') {
            this.send_link = true;
        }
        if (scheduling === 'now' && this.buildType === 'googleclassroom') {
            console.log('first one');
            this.nowGoogleClass = true;
        }
        else if (scheduling === 'now' && this.buildType === 'googlesheet') {
            this.nowGoogleSheet = true;
            console.log('first two');
        }
        else if (scheduling === 'now' && this.buildType === 'sendlink') {
            console.log('first three');
            this.nowSendLInk = true;
        }
        else if (scheduling === 'future' && this.buildType === 'googleclassroom') {
            console.log('second one');
            this.futureGoogleClass = true;
        }
        else if (scheduling === 'future' && this.buildType === 'googlesheet') {
            console.log('second second');
            this.futureGoogleSheet = true;
        }
        else if (scheduling === 'future' && this.buildType === 'sendlink') {
            console.log('second third');
            this.futureSendLink = true;
        }
        else if (scheduling === 'dont_know' && this.buildType === 'googleclassroom') {
            console.log('third one');
            this.dknowGoogleClass = true;
        }
        else if (scheduling === 'dont_know' && this.buildType === 'googlesheet') {
            console.log('third two');
            this.dknowGoogleSheet = true;
        }
        else if (scheduling === 'dont_know' && this.buildType === 'sendlink') {
            console.log('third three');
            this.dknowSendLink = true;
        }
        const gradeData = this.unleash.getGradeDetails();
        const className = this.unleash.getClassName();
        let dateandTime;
        if (scheduling !== 'dont_know') {
            dateandTime = this.unleash.getDateTime();
        }
        if (dateandTime && dateandTime.time) {
            this.timeSelected = dateandTime.time;
        }
        console.log(scheduling);
        console.log(dateandTime);
        this.allDetails = {
            grade: gradeData.grade,
            gradeName: gradeData.name,
            class: className,
            date: dateandTime ? dateandTime.date : null,
            time: dateandTime ? dateandTime.time : null,
            day: dateandTime ? dateandTime.day : null,
            month: dateandTime ? dateandTime.month : null,
            year: dateandTime ? dateandTime.year : null,
            schedulingType: scheduling,
            buildType: this.buildType
        };
        console.log(this.allDetails);
    }
    onFileSelected(event) {
        console.log(event);
        this.fileName = event[0].name;
        // const file: File = event[0];
        // console.log(file);
    }
    buildRosterSend(type, stepper) {
        this.buildType = type;
        // stepper.next();
    }
    buildRoster(type) {
        console.log(type);
        this.buildType = type;
        if (type === 'googlesheet') {
            this.buildRosterPage = false;
            this.googlePage = true;
            const data = this.unleash.getGradeDetails();
            console.log(data);
            this.classroom = data;
        }
        if (type === 'googleclassroom') {
            this.buildRosterPage = false;
            this.googleClassRoom = true;
        }
        if (type === 'sendlink') {
            this.sendlink = true;
            this.getAllDetails();
        }
        const rosterBuildType = {
            googleClassroom: this.googleClassRoom,
            excelSheet: this.googlePage,
            sendLink: this.sendlink
        };
        console.log(rosterBuildType);
    }
    selectedAccount(account) {
        console.log(account);
        this.googleClassRoom = false;
        this.className = true;
    }
    selectClass() {
        this.beforeSelectClass = false;
        this.afterSelectClass = true;
        this.availClass = [
            // tslint:disable-next-line: max-line-length
            'Science 14:Earth', 'History 5.2: Lessons from the cold war, Music Technology', 'Math100: Geometric Basics', 'testing', 'testing', 'testing', 'testing', 'testing', 'testing', 'testing', 'testing', 'testing'
        ];
    }
    classNameSelected(className) {
        this.selectedClassName = className;
        this.slecteGoogleClass = true;
        this.unleash.postClassName(this.selectedClassName);
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
        console.log(times);
        return times;
    }
    ngOnInit() {
        this.loggedIn = true;
        this.letsGetStartedFlow = true;
        this.unleashService.postLogin(true);
        this.unleashService.getStartedFlow(true);
        this.unleash.changeTheme('light');
        console.log(this.timeNow);
        this.onSelect(this.today, 'first');
        const times = this.getTimeArray();
        console.log(times);
        this.DayAndDate = this.date;
        this.time = times;
        this.selectedTime = '00:00 AM';
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }
    ngOnDestroy() {
        this.unleashService.postLogin(false);
        this.unleashService.getStartedFlow(false);
    }
};
RosterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-roster',
        templateUrl: './roster.component.html',
        styleUrls: ['./roster.component.css']
    })
], RosterComponent);
export { RosterComponent };
//# sourceMappingURL=roster.component.js.map