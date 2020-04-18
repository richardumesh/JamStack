import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
let CallbackComponent = class CallbackComponent {
    constructor(route, auth, router, toast) {
        this.route = route;
        this.auth = auth;
        this.router = router;
        this.toast = toast;
        this.emailExist = false;
        this.invalidLogin = false;
    }
    ngOnInit() {
        this.loading = true;
        const authcode = this.route.snapshot.queryParamMap.get('code');
        if (authcode) {
            const config = {
                code: authcode,
                redirect_uri: environment.redirect_endpoint,
                client_id: environment.client_id,
                client_secret: environment.client_secret,
                scope: environment.scope,
                grant_type: environment.grant_type,
                access_type: environment.access_type
            };
            //  hitting the Google endpoint (access_token)
            this.auth.getGoogleToken(environment.token_endpoint, config).subscribe(res => {
                //get the Google User profile details
                this.auth.getProfile(environment.profile_endpoint + '/me', res).subscribe(profile => {
                    const googlePayload = {
                        "email": profile.emailAddress,
                        "userDetails": {
                            "firstName": profile.name.givenName,
                            "lastName": profile.name.familyName ? profile.name.familyName : '',
                            "googleAT": res.id_token,
                            "contactForResearch": true,
                            "acceptedTerms": true
                        }
                    };
                    // Register with Google account
                    this.auth.register(googlePayload).subscribe(response => {
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
                        const nav = localStorage.getItem('pageVisited');
                        if (nav === 'register') {
                            this.router.navigate(['/registration']);
                        }
                        else {
                            this.router.navigate(['/login']);
                        }
                        this.toast.error(err.error.message, 'error !');
                    });
                });
            });
        }
    }
};
CallbackComponent = tslib_1.__decorate([
    Component({
        selector: 'app-callback',
        templateUrl: './callback.component.html',
        styleUrls: ['./callback.component.css']
    })
], CallbackComponent);
export { CallbackComponent };
//# sourceMappingURL=callback.component.js.map