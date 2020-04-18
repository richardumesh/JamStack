import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
let RegistrationComponent = class RegistrationComponent {
    constructor(formBuilder, unleashService, router, route, auth, toast) {
        this.formBuilder = formBuilder;
        this.unleashService = unleashService;
        this.router = router;
        this.route = route;
        this.auth = auth;
        this.toast = toast;
        this.submitted = false;
        this.teamsPolicyError = false;
        this.contactForResearch = false;
        this.signUp = false;
        this.emailExist = false;
        this.loading = false;
        this.regForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)]],
            confirmPassword: ['', [Validators.required]],
            iAgree: [false, Validators.requiredTrue],
            iAllow: [false]
        });
    }
    ngOnInit() {
        this.signUp = true;
        this.unleashService.changeTheme('light');
        this.unleashService.changeSignup(true);
    }
    ngOnDestroy() {
        this.unleashService.changeSignup(false);
    }
    registerAccount() {
        this.submitted = true;
        if (this.regForm.controls.password.value !== this.regForm.controls.confirmPassword.value) {
            return;
        }
        if (this.regForm.valid) {
            this.loading = true;
            const payload = {
                "email": this.regForm.controls.email.value,
                "password": btoa(this.regForm.controls.password.value),
                "userDetails": {
                    "firstName": this.regForm.controls.firstName.value,
                    "lastName": this.regForm.controls.lastName.value,
                    "contactForResearch": this.regForm.controls.iAllow.value,
                    "acceptedTerms": this.regForm.controls.iAgree.value
                }
            };
            this.auth.register(payload).subscribe(response => {
                if (response.is_success == true) {
                    const userDetails = {
                        "firstName": response.result.userDetails.firstName,
                        "lastName": response.result.userDetails.lastName,
                        "email": response.result.email,
                        "token": response.result.token
                    };
                    this.auth.setUserData(userDetails);
                    this.loading = false;
                    this.router.navigate(['lets-get-started']);
                }
            }, err => {
                this.loading = false;
                this.emailExist = true;
                this.emailExist = err.error.message;
            });
        }
    }
    googleAuth2() {
        localStorage.setItem('pageVisited', 'register');
        window.location.href = `${environment.code_endpoint}?redirect_uri=${environment.redirect_endpoint}&
    prompt=consent&response_type=code&client_id=${environment.client_id}&scope=${environment.scope}&access_type=${environment.access_type}`;
    }
};
RegistrationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styleUrls: ['./registration.component.css']
    })
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map