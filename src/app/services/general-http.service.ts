import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GeneralHttpService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getHeader() {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.append('authorization', this.getToken());
    return header;
  }

  getToken() {
    const tokenData = JSON.parse(localStorage.getItem('newUserLoggedinDetails'));
    if (tokenData) {
      return tokenData.token;
    } else {
      localStorage.clear();
      this.router.navigate(['/home']);
    }
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    const authToken = this.getToken();
    headers = headers.append('authorization', authToken);
    return headers;
  }

  genericGet(endPoint, params?) {
    const header = this.getHeader();
    return this.httpClient.get(endPoint, { headers: header, params })
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  genericPost(endPoint, payload?, params?) {
    const header = this.getHeader();
    return this.httpClient.post(endPoint, payload, { headers: header, params })
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  genericPut(endPoint, payload?, params?) {
    const header = this.getHeader();
    return this.httpClient.put(endPoint, payload, { headers: header, params })
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  genericdelete(endPoint, payload?, params?) {
    const header = this.getHeader();
    return this.httpClient.request('delete', endPoint, {
      headers: header,
      params,
      body: payload
    }).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  genericpatch(endPoint, payload?, params?) {
    const header = this.getHeader();
    return this.httpClient.patch(endPoint, payload, { headers: header, params })
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }
  genericPostNoToken(endPoint, key) {
    return this.httpClient.post(endPoint, key)
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: Response) {
    console.log(error);
    if (error.status === 401) {
      window.location.href = '/login';
    }
    return throwError(error);
  }
}