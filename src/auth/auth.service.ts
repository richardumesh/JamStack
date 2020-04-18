import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, of, throwError, pipe } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GeneralHttpService } from 'src/app/services/general-http.service';
import { environment } from '../environments/environment';

export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class AuthService {

  private profileSource = new BehaviorSubject('');
  currentProfile = this.profileSource.asObservable();

  constructor(private httpClient: HttpClient, private https: GeneralHttpService, private route: ActivatedRoute) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  getTokenLogin() {
    let token = JSON.parse(localStorage.getItem('googleUser'));
    if (token) {
      return token.access_token;
    }
    else {
      this.googleAuth2roster();
    }
  }

  googleAuth2roster() {
    localStorage.setItem('pageVisited', 'login');
    window.location.href = `${environment.code_endpoint}?redirect_uri=${environment.redirect_endpoint_roster}&
   prompt=consent&response_type=code&client_id=${environment.client_id}&scope=${environment.scope}&access_type=${environment.access_type}`;
  }
  getTokenExpirationDate(token: string) {
    try {
      const decoded = jwt_decode(token);
      if (decoded.exp === undefined) { return null; }
      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    } catch {
      return false;
    }
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }
    const date = this.getTokenExpirationDate(token);
    if (!date) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  setUserData(data) {
    localStorage.setItem(TOKEN_NAME, data.token);
    localStorage.setItem('newUserLoggedinDetails', JSON.stringify(data));
  }
  // Google API call
  getGoogleToken(URL, res) {
    return this.httpClient.post(URL, res, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(map((response: any) => response));
  }

  getGoogleClass() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.getTokenLogin()
    });
    return this.httpClient.get('https://classroom.googleapis.com/v1/courses', { headers, params: { key: 'AIzaSyAo9ggWNFa8DG7G-FhzEhTDfrs6CjG1Fcw' } })
      .pipe(map((response: any) => response));
  }

  getStudentList(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.getTokenLogin()
    });
    return this.httpClient.get('https://classroom.googleapis.com/v1/courses/' + id + '/students', { headers, params: { key: 'AIzaSyAo9ggWNFa8DG7G-FhzEhTDfrs6CjG1Fcw' } })
      .pipe(map((response: any) => response));
  }


  //Google Profile access
  getProfile(URL, res) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + res.access_token
    });
    return this.httpClient.get(URL, { headers })
      .pipe(map((response: any) => response));
  }
  //API integration
  register(data): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + environment.REGISTERAPI_URL;
    return this.httpClient.post(endPoint, data)
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }
  login(data): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + environment.LOGINAPI_URL;
    return this.httpClient.post(endPoint, data)
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  resetPwdInProfilePage(data): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + environment.RESETPWDFORPROFILE_URL;
    return this.https.genericPost(endPoint, data);
  }
  resetpassword(password): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + environment.RESETPWD_URL;
    return this.httpClient.post(endPoint, password)
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }
  recoverpassword(password): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + environment.RECOVERPWD_URL;
    return this.httpClient.post(endPoint, password)
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: Response) {
    return throwError(error);
  }
}
