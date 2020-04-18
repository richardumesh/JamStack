import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HeaderComponent = class HeaderComponent {
    constructor(router, unleashService) {
        this.router = router;
        this.unleashService = unleashService;
        this.loggedIn = false;
        this.letsGetStartedFlow = false;
        this.signIn = false;
        this.signUp = false;
        this.isDashboard = false;
        this.isRecoverPass = false;
    }
    navigateToPage(page) {
        this.selectedPage = page;
        page = '/' + page;
        this.router.navigate([page]);
    }
    ngOnInit() {
        this.userLoggedIn = JSON.parse(localStorage.getItem('newUserLoggedinDetails'));
        this.unleashService.currentLogin.subscribe(status => {
            if (status) {
                this.signIn = true;
            }
        });
        this.unleashService.currentSignup.subscribe(status => {
            if (status) {
                this.signUp = true;
            }
        });
        this.unleashService.loggedIn.subscribe(status => {
            if (status) {
                this.loggedIn = true;
            }
        });
        this.unleashService.letsGetStartedFlow.subscribe(status => {
            if (status) {
                this.letsGetStartedFlow = true;
            }
        });
        this.unleashService.isDashboard.subscribe(status => {
            if (status) {
                this.isDashboard = true;
            }
        });
        this.unleashService.recoverPasswordFlow.subscribe(status => {
            if (status) {
                this.isRecoverPass = true;
            }
        });
        this.unleashService.navBarStatus = false;
        this.unleashService.currentTeam.subscribe(theme => {
            this.themeColor = theme;
        });
    }
    collapseNavebar() {
        if (this.unleashService.navBarStatus === false) {
            this.unleashService.navBarStatus = true;
        }
        else {
            this.unleashService.navBarStatus = false;
        }
    }
    logout() {
        this.router.navigate(['/home']);
        localStorage.clear();
    }
    goToMyProfile() {
        this.router.navigate(['edit-profile']);
    }
    goToDashboard() {
        this.router.navigate(['/dashboard']);
    }
};
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map