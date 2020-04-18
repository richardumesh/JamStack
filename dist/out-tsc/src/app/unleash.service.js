import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
let UnleashService = class UnleashService {
    constructor(https, router) {
        this.https = https;
        this.router = router;
        this.cardData = [];
        this.archiveData = [];
        this.questions1Answers = [];
        this.question3Answer = '';
        this.booleanQAnswer = [];
        this.profileSource = new BehaviorSubject('');
        this.pageTheme = new BehaviorSubject('');
        this.currentProfile = this.profileSource.asObservable();
        this.currentTeam = this.pageTheme.asObservable();
        this.loginSource = new BehaviorSubject(false);
        this.currentLogin = this.loginSource.asObservable();
        this.signupSource = new BehaviorSubject(false);
        this.currentSignup = this.signupSource.asObservable();
        this.loggedInSource = new BehaviorSubject(false);
        this.loggedIn = this.loggedInSource.asObservable();
        this.dashboardPage = new BehaviorSubject(false);
        this.isDashboard = this.dashboardPage.asObservable();
        this.letsGetStarted = new BehaviorSubject(false);
        this.letsGetStartedFlow = this.letsGetStarted.asObservable();
        this.recoverPassword = new BehaviorSubject(false);
        this.recoverPasswordFlow = this.recoverPassword.asObservable();
        this.userDashDetails = {
            name: localStorage.getItem('newUserName'),
        };
        this.userDashDetails = {
            name: 'Ms. Shelly',
        };
    }
    pwdDetails(data) {
        this.pwdData = data;
    }
    getpwdDetails() {
        let data = this.pwdData;
        if (data === undefined) {
            data = '';
        }
        return data;
    }
    gradeDetails(data) {
        this.gradeData = data;
    }
    getGradeDetails() {
        let data = this.gradeData;
        if (data === undefined) {
            data = '';
        }
        return data;
    }
    postScheduling(data) {
        this.scheduling = data;
    }
    getScheduling() {
        let data = this.scheduling;
        if (data === undefined) {
            data = '';
        }
        return data;
    }
    postClassName(data) {
        if (data === undefined) {
            data = '';
        }
        this.className = data;
    }
    getClassName() {
        let data = this.className;
        if (data === undefined) {
            data = '';
        }
        return data;
    }
    postdate(data) {
        if (data === undefined) {
            data = '';
        }
        this.dateTime = data;
    }
    getDateTime() {
        let data = this.dateTime;
        if (data === undefined) {
            data = '';
        }
        return data;
    }
    getUserData() {
        return this.userData;
    }
    getUserDetails() {
        const userdetails = {
            name: localStorage.getItem('newUserName'),
        };
        return userdetails;
    }
    getcardDetails() {
        const details = JSON.parse(localStorage.getItem('details'));
        this.cardData.push(details);
        return this.cardData;
    }
    getarchiveDetails() {
        const details = JSON.parse(localStorage.getItem('archives'));
        this.archiveData.push(details);
        return this.archiveData;
    }
    changeProfile(profile) {
        this.profileSource.next(profile);
    }
    changeTheme(theme) {
        this.pageTheme.next(theme);
    }
    changeLogin(status) {
        this.loginSource.next(status);
    }
    changeSignup(status) {
        this.signupSource.next(status);
    }
    postLogin(status) {
        this.loggedInSource.next(status);
    }
    getStartedFlow(status) {
        this.letsGetStarted.next(status);
    }
    dashboardFlow(status) {
        this.dashboardPage.next(status);
    }
    recPassFlow(status) {
        this.recoverPassword.next(status);
    }
    // API Integration
    // Get Profile Details API
    getProfileDetails() {
        const endPoint = environment.BASEURL + environment.VERSION_URL + '/users';
        return this.https.genericGet(endPoint);
    }
    // Update Profile Details API
    updateProfileDetails(data) {
        const endPoint = environment.BASEURL + environment.VERSION_URL + 'users';
        return this.https.genericPut(endPoint, data);
    }
    getDashboardData() {
        const endPoint = environment.BASEURL + environment.VERSION_URL + 'users';
        return this.https.genericGet(endPoint);
    }
    archive(data) {
        const endPoint = environment.BASEURL + environment.VERSION_URL + 'archive';
        return this.https.genericPost(endPoint, data);
    }
};
UnleashService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], UnleashService);
export { UnleashService };
//# sourceMappingURL=unleash.service.js.map