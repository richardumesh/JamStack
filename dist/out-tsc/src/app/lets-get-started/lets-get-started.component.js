import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let LetsGetStartedComponent = class LetsGetStartedComponent {
    constructor(fb, unleashService, router) {
        this.unleashService = unleashService;
        this.router = router;
        this.loggedIn = false;
        this.selectedGrade = [];
        this.letsGetStartedFlow = false;
        this.submitted = false;
        this.specialChar = true;
        this.alpha = false;
        this.loading = false;
        this.Grades = [
            'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College'
        ];
        this.options = fb.group({
            name: ['', [Validators.required, Validators.maxLength(140)]],
            grade: ['', [Validators.required]]
        });
    }
    getData(page) {
        const data = {
            name: this.options.value.name,
            grade: this.options.value.grade
        };
        this.unleashService.gradeDetails(data);
        if (data.name.length > 0 && data.grade.length > 0) {
            page = '/' + page;
            this.router.navigate([page]);
            this.submitted = true;
        }
        else {
            this.submitted = false;
        }
        console.log('submitted ======', this.submitted);
    }
    onFormSubmit(form) {
        console.log(form);
    }
    ngOnInit() {
        this.loggedIn = true;
        this.letsGetStartedFlow = true;
        this.unleashService.postLogin(true);
        this.unleashService.getStartedFlow(true);
        this.unleashService.changeTheme('light');
    }
    ngOnDestroy() {
        this.letsGetStartedFlow = false;
        this.unleashService.postLogin(false);
        this.unleashService.getStartedFlow(false);
    }
};
LetsGetStartedComponent = tslib_1.__decorate([
    Component({
        selector: 'app-lets-get-started',
        templateUrl: './lets-get-started.component.html',
        styleUrls: ['./lets-get-started.component.css']
    })
], LetsGetStartedComponent);
export { LetsGetStartedComponent };
//# sourceMappingURL=lets-get-started.component.js.map