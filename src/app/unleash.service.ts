import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, Observer, of, throwError, pipe } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GeneralHttpService } from './services/general-http.service';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UnleashService {
  currentTopic: any;
  userData: any;
  userDashDetails: any;
  navBarStatus: any;
  cardData: any = [];
  pwdData: any;
  gradeData: any;
  className: any;
  dateTime: any;
  scheduling: any;
  archiveData: any = [];
  questions1Answers = [];
  question3Answer = '';
  booleanQAnswer = [];

  private profileSource = new BehaviorSubject('');
  private pageTheme = new BehaviorSubject('');
  currentProfile = this.profileSource.asObservable();
  currentTeam = this.pageTheme.asObservable();

  private loginSource = new BehaviorSubject(false);
  currentLogin = this.loginSource.asObservable();

  private signupSource = new BehaviorSubject(false);
  currentSignup = this.signupSource.asObservable();

  private loggedInSource = new BehaviorSubject(false);
  loggedIn = this.loggedInSource.asObservable();

  private dashboardPage = new BehaviorSubject(false);
  isDashboard = this.dashboardPage.asObservable();
  buildType: any;

  private letsGetStarted = new BehaviorSubject(false);
  letsGetStartedFlow = this.letsGetStarted.asObservable();

  private recoverPassword = new BehaviorSubject(false);
  recoverPasswordFlow = this.recoverPassword.asObservable();

  private details = new BehaviorSubject(false);
  getDetails = this.details.asObservable();

  private contactUsPage = new BehaviorSubject(false);
  isContactUs = this.contactUsPage.asObservable();

  private profilepage = new BehaviorSubject(false);
  isProfile = this.profilepage.asObservable();

  private dashboard = new BehaviorSubject(false);
  dashboardShow = this.dashboard.asObservable();

  constructor(private https: GeneralHttpService, private router: Router) {
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

  showDashboard(status: boolean) {
    this.dashboard.next(status);
  }

  getpwdDetails() {
    let data = this.pwdData;
    if (data === undefined) {
      data = '';
    }
    return data;
  }


  handleResponse(response) {
    if (!response) {
      return true;
    } else {
      return response;
    }
  }

  storeTopicDetails(data) {
    this.currentTopic = data;
  }
  getTopic() {
    return this.currentTopic;
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

  getDateTime() { // not using in any component
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

  changeProfile(profile: string) {
    this.profileSource.next(profile);
  }

  changeTheme(theme: string) {
    this.pageTheme.next(theme);
  }

  changeLogin(status: boolean) {
    this.loginSource.next(status);
  }

  changeSignup(status: boolean) {
    this.signupSource.next(status);
  }

  postLogin(status: boolean) {
    this.loggedInSource.next(status);
  }

  getStartedFlow(status: boolean) {
    this.letsGetStarted.next(status);
  }

  dashboardFlow(status: boolean) {
    this.dashboardPage.next(status);
  }
  contactUsFlow(status: boolean) {
    this.contactUsPage.next(status);
  }
  profilePageFlow(status: boolean) {
    this.profilepage.next(status);
  }
  recPassFlow(status: boolean) {
    this.recoverPassword.next(status);
  }

  reviewDetailsStatus(data: any) {
    this.details.next(data);
  }

  // API Integration
  // updateTopic(data) {
  //   const url = environment.BASEURL + environment.VERSION_URL + environment.POST_TOPIC;
  //   return this.https.genericPut(url, data);
  // }

  sendNotification(id) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + environment.SEND_NOTIFICATION + id;
    return this.https.genericGet(endPoint);
  }

  postRoster(data, topicId): Observable<any> {
    const url = environment.BASEURL + environment.VERSION_URL + environment.POST_ROSTER + topicId;
    return this.https.genericPost(url, data);
  }

  gradeDetails(data) {
    const url = environment.BASEURL + environment.VERSION_URL + environment.POST_TOPIC;
    console.log(url);
    return this.https.genericPost(url, data);
  }
  // Get Profile Details API
  getProfileDetails(): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'users';
    return this.https.genericGet(endPoint);
  }
  // Update Profile Details API
  updateProfileDetails(data): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'users';
    return this.https.genericPut(endPoint, data);
  }

  getDashboardData(): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'users';
    return this.https.genericGet(endPoint);
  }
  archive(data) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic/archive';
    return this.https.genericPost(endPoint, data);
  }
  getArchive() {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic/archive';
    return this.https.genericGet(endPoint);
  }
  restoreArchive(id) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic/restore-archive/' + id;
    return this.https.genericGet(endPoint);
  }
  getUnopend(topicId) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic/un-opened/' + topicId;
    return this.https.genericGet(endPoint);
  }
  sendReminder(topicId) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic/reminder/' + topicId;
    return this.https.genericGet(endPoint);
  }
  duplicateTopic(data) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic/duplicate';
    return this.https.genericPost(endPoint, data);
  }
  updateTopic(data) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic';
    return this.https.genericPut(endPoint, data);
  }
  getRoster(topicId) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic/review/' + topicId;
    return this.https.genericGet(endPoint);
  }
  getReviewDetails(topicId) {
    const url = environment.BASEURL + environment.VERSION_URL + environment.GET_REVIEW_DETAILS + topicId;
    return this.https.genericGet(url);
  }
  scheduleNotification(topicId) {
    const url = environment.BASEURL + environment.VERSION_URL + environment.SCHEDULE_NOTIFICZTION + topicId;
    return this.https.genericGet(url);
  }
  scheduleInvitationLink(topicId) {
    const url = environment.BASEURL + environment.VERSION_URL + 'topic/schedule-invitation/' + topicId;
    return this.https.genericGet(url);
  }

  checkTopicStatus(data) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'topic/status';
    return this.https.genericPostNoToken(endPoint, data);
  }
  studentRegister(data) {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'student/register';
    return this.https.genericPostNoToken(endPoint, data);
  }

}
