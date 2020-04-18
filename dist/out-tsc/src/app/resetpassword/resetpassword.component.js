import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let ResetpasswordComponent = class ResetpasswordComponent {
    constructor(formBuilder, unleashService) {
        this.formBuilder = formBuilder;
        this.unleashService = unleashService;
        this.submitted = false;
        this.signIn = false;
        this.resetpassForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
    ngOnInit() {
        this.unleashService.changeTheme('light');
        this.unleashService.changeLogin(true);
    }
    resetPassword() {
        this.submitted = true;
        if (this.resetpassForm.valid) {
            console.log(JSON.stringify(this.resetpassForm.value));
        }
    }
    ngOnDestroy() {
        this.unleashService.changeLogin(false);
    }
};
ResetpasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-resetpassword',
        templateUrl: './resetpassword.component.html',
        styleUrls: ['./resetpassword.component.css']
    })
], ResetpasswordComponent);
export { ResetpasswordComponent };
//# sourceMappingURL=resetpassword.component.js.map