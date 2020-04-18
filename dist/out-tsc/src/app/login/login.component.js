import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, unleashService, router, route, auth) {
        this.formBuilder = formBuilder;
        this.unleashService = unleashService;
        this.router = router;
        this.route = route;
        this.auth = auth;
        this.submitted = false;
        this.passwordError = false;
        this.signIn = false;
        this.invalidLogin = false;
        this.loading = false;
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
        this.checkUserData = this.unleashService.getUserData();
    }
    ngOnInit() {
        this.signIn = true;
        this.unleashService.changeTheme('light');
        this.unleashService.changeLogin(true);
    }
    ngOnDestroy() {
        this.unleashService.changeLogin(false);
    }
    loginUser() {
        this.submitted = true;
        // calling the login api
        if (this.loginForm.valid) {
            this.loading = true;
            const loginPayload = {
                email: this.loginForm.controls.email.value,
                password: btoa(this.loginForm.controls.password.value) // convert password to base64
            };
            this.auth.login(loginPayload).subscribe(response => {
                const userDetails = {
                    "firstName": response.result.userDetails.firstName,
                    "lastName": response.result.userDetails.lastName,
                    "email": response.result.email,
                    "token": response.result.token
                };
                this.auth.setUserData(userDetails);
                this.loading = false;
                this.router.navigate(['lets-get-started']);
            }, err => {
                this.loading = false;
                this.invalidLogin = true;
                this.invalidLogin = err.error.message;
            });
        }
    }
    googleAuth2() {
        localStorage.setItem('pageVisited', 'login');
        window.location.href = `${environment.code_endpoint}?redirect_uri=${environment.redirect_endpoint}&
    prompt=consent&response_type=code&client_id=${environment.client_id}&scope=${environment.scope}&access_type=${environment.access_type}`;
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map