import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
export const TOKEN_NAME = 'jwt_token';
let AuthService = class AuthService {
    constructor(httpClient, https) {
        this.httpClient = httpClient;
        this.https = https;
        this.profileSource = new BehaviorSubject('');
        this.currentProfile = this.profileSource.asObservable();
    }
    getToken() {
        return localStorage.getItem(TOKEN_NAME);
    }
    getTokenExpirationDate(token) {
        const decoded = jwt_decode(token);
        if (decoded.exp === undefined) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    isTokenExpired(token) {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        if (!date)
            return false;
        return !(date.valueOf() > new Date().valueOf());
    }
    setUserData(data) {
        localStorage.setItem(TOKEN_NAME, data.token);
        localStorage.setItem('newUserLoggedinDetails', JSON.stringify(data));
    }
    // Google API call
    getGoogleToken(URL, res) {
        return this.httpClient.post(URL, res, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .pipe(map((response) => response));
    }
    //Google Profile access
    getProfile(URL, res) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + res.access_token
        });
        return this.httpClient.get(URL, { headers })
            .pipe(map((response) => response));
    }
    //API integration
    register(data) {
        const endPoint = environment.BASEURL + environment.VERSION_URL + environment.REGISTERAPI_URL;
        return this.httpClient.post(endPoint, data)
            .pipe(map(res => res), catchError(this.errorHandler));
    }
    login(data) {
        const endPoint = environment.BASEURL + environment.VERSION_URL + environment.LOGINAPI_URL;
        return this.httpClient.post(endPoint, data)
            .pipe(map(res => res), catchError(this.errorHandler));
    }
    resetPwd(data) {
        const endPoint = environment.BASEURL + environment.VERSION_URL + environment.RESETPWD_URL;
        return this.https.genericPost(endPoint, data);
    }
    errorHandler(error) {
        console.log(error);
        return throwError(error);
    }
};
AuthService = tslib_1.__decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map