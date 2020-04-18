import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let RecoveryPasswordComponent = class RecoveryPasswordComponent {
    constructor(formBuilder, unleashService, router) {
        this.formBuilder = formBuilder;
        this.unleashService = unleashService;
        this.router = router;
        this.submitted = false;
        this.signIn = false;
        this.showSuccessMsg = false;
        this.recoverpassForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        });
    }
    ngOnInit() {
        this.unleashService.changeTheme('light');
        this.unleashService.recPassFlow(true);
    }
    recoverpassword() {
        this.submitted = true;
        if (this.recoverpassForm.valid) {
            if (this.recoverpassForm.controls.password.value === this.recoverpassForm.controls.confirmPassword.value) {
                console.log(JSON.stringify(this.recoverpassForm.value));
                this.showSuccessMsg = true;
            }
        }
    }
    ngOnDestroy() {
        this.unleashService.recPassFlow(false);
    }
};
RecoveryPasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-recovery-password',
        templateUrl: './recovery-password.component.html',
        styleUrls: ['./recovery-password.component.css']
    })
], RecoveryPasswordComponent);
export { RecoveryPasswordComponent };
//# sourceMappingURL=recovery-password.component.js.map