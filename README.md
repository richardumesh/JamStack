# UnleashUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).




<!-- Things to keep in mind -->

#Adding New stepper

::ng-deep .mat-step-header .mat-step-label {
  overflow: visible;
}

::ng-deep .mat-step-header .mat-step-icon-not-touched span,
::ng-deep .mat-step-header .mat-step-icon span,
::ng-deep .mat-step-header .mat-step-icon-not-touched .mat-icon,
::ng-deep .mat-step-header .mat-step-icon .mat-icon {
display: none;
}

#add new stepper type (ng-deep .mat-step-header:nth-of-type(1)) for everystepper we add.

::ng-deep .mat-step-header:nth-of-type(1) .mat-step-icon-not-touched:after,  
::ng-deep .mat-step-header:nth-of-type(2) .mat-step-icon-not-touched:after,  
::ng-deep .mat-step-header:nth-of-type(3) .mat-step-icon-not-touched:after,
::ng-deep .mat-step-header:nth-of-type(1) .mat-step-icon:after {
  content: 'STEP 1';
  display: flex;
  justify-content: center;
  margin-top: -20px;
  color: #939393;
  font-family: var(--secondary-font);
  font-size: 9px;
  font-weight: 900;
  line-height: 12px;
}

::ng-deep .mat-step-header:nth-of-type(2) .mat-step-icon:after {
  content: 'STEP 2' !important;
  display: flex;
  justify-content: center;
  margin-top: -20px;
  color: #939393;
  font-family: var(--secondary-font);
  font-size: 9px;
  font-weight: 900;
  line-height: 12px;
}

::ng-deep .mat-step-header:nth-of-type(3) .mat-step-icon:after {
  content: 'STEP 3' !important;
  display: flex;
  justify-content: center;
  margin-top: -20px;
  color: #939393;
  font-family: var(--secondary-font);
  font-size: 9px;
  font-weight: 900;
  line-height: 12px;
}

.active-step-1 mat-step-header:nth-of-type(1) .mat-step-icon-not-touched::after,
.active-step-1 mat-step-header:nth-of-type(1) .mat-step-icon::after {
content: 'add_circle' !important; 
font-family: 'Material Icons' !important;
font-feature-settings: 'liga' 1;
}
