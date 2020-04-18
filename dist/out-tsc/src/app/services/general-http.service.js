import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
let GeneralHttpService = class GeneralHttpService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getHeader() {
        let header = new HttpHeaders();
        header = this.createAuthorizationHeader(header);
        header = header.append('Content-Type', 'application/json');
        return header;
    }
    getToken() {
        const tokenData = JSON.parse(localStorage.getItem('newUserLoggedinDetails'));
        return tokenData.token;
    }
    createAuthorizationHeader(headers) {
        const authToken = this.getToken();
        headers = headers.append('authorization', authToken);
        return headers;
    }
    genericGet(endPoint, params) {
        const header = this.getHeader();
        return this.httpClient.get(endPoint, { headers: header, params })
            .pipe(map(res => res), catchError(this.errorHandler));
    }
    genericPost(endPoint, payload, params) {
        const header = this.getHeader();
        return this.httpClient.post(endPoint, payload, { headers: header, params })
            .pipe(map(res => res), catchError(this.errorHandler));
    }
    genericPut(endPoint, payload, params) {
        const header = this.getHeader();
        return this.httpClient.put(endPoint, payload, { headers: header, params })
            .pipe(map(res => res), catchError(this.errorHandler));
    }
    genericdelete(endPoint, payload, params) {
        const header = this.getHeader();
        return this.httpClient.request('delete', endPoint, {
            headers: header,
            params,
            body: payload
        }).pipe(map(res => res), catchError(this.errorHandler));
    }
    genericpatch(endPoint, payload, params) {
        const header = this.getHeader();
        return this.httpClient.patch(endPoint, payload, { headers: header, params })
            .pipe(map(res => res), catchError(this.errorHandler));
    }
    errorHandler(error) {
        console.log(error);
        return throwError(error);
    }
};
GeneralHttpService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], GeneralHttpService);
export { GeneralHttpService };
//# sourceMappingURL=general-http.service.js.map