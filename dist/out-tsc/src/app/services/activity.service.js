import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
let ActivityService = class ActivityService {
    constructor() {
        this.questions1Answers = [];
        this.question3Answer = '';
        this.booleanQAnswer = [];
        this.allAnswers = [];
    }
    setQuestion1Answers(questions1Answers) {
        this.questions1Answers = questions1Answers;
        this.allAnswers.push(questions1Answers);
        return new Observable(obs => obs.next(questions1Answers));
    }
    getQuestion1Answers() {
        return this.questions1Answers;
    }
    setQuestions3Answer(textInput) {
        this.question3Answer = textInput;
        this.allAnswers.push(this.question3Answer);
        return new Observable(obs => obs.next(textInput));
    }
    getQuestion3Answer() {
        return this.question3Answer;
    }
    setSelectedBoolean(option) {
        this.booleanQAnswer = option;
        this.allAnswers.push(this.booleanQAnswer);
        return new Observable(obs => obs.next(option));
    }
};
ActivityService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ActivityService);
export { ActivityService };
//# sourceMappingURL=activity.service.js.map