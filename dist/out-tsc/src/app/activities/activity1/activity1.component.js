import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let Activity1Component = class Activity1Component {
    constructor(router, activityService) {
        this.router = router;
        this.activityService = activityService;
        // Variables used for Multi-Select Question Type
        this.count = 0;
        this.selectedAnswers = [];
        this.submit = 'bef-sel';
        // Variables used for Text Question Type
        this.selectedOptions = [];
        this.textBox = 'bef-text text-inp';
        this.changed = false;
        this.save = 'bef-sel';
        this.textInput = '';
        this.allAnswers = [];
        this.booleanAnswers = [];
        // Variables used for Yes or No Question Type
        this.selectedBoolean = [];
        this.selectedYes = false;
        this.selectedNo = false;
        this.questionsList = [];
        this.click = 0;
        this.clickedOption = undefined;
        this.selectedQuestion = 0;
        this.activity = [{
                id: 'multi',
                type: 'multiselect',
                showSelectedOptions: false,
                select: {
                    min: 2,
                    max: 3,
                    dataOptions: [
                        { id: 1, text: 'Good at art', image: '001-pencil.svg', clicked: false },
                        { id: 2, text: 'Belonging to a social group', image: '006-chat.svg', clicked: false },
                        { id: 3, text: 'Being creative', image: '002-theater.svg', clicked: false },
                        { id: 4, text: 'Listening to music', image: '008-audio.svg', clicked: false },
                        { id: 5, text: 'Being independent', image: '003-alien.svg', clicked: false },
                        { id: 6, text: 'Playing music', image: '007-youtube.svg', clicked: false },
                        { id: 7, text: 'Living in the moment', image: '005-compass.svg', clicked: false },
                        { id: 8, text: 'Following politics or government', image: '009-shout.svg', clicked: false }
                    ],
                },
                question: 'What are your personal values?',
                label1: 'What\'s most important to you?',
                label2: ''
            },
            {
                id: 'text',
                type: 'text',
                showSelectedOptions: true,
                question: '',
                label1: 'Think about times when these values were very important to you. Describe why these values are important to you.',
                label2: 'Focus on your thoughts and feelings and dont worry about spelling and how its written.'
            },
            {
                id: 'boolean',
                type: 'yesno',
                showSelectedOptions: true,
                question: 'My Personal Values',
                questionsList: [
                    { id: 0, question: 'In general, I try to live up to these things.', ans: null },
                    { id: 1, question: 'These things are an important part of who I am.', ans: null },
                    { id: 2, question: 'I care about these things.', ans: null }
                ],
                options: ['Yes', 'No']
            },
            {
                type: 'savedData',
                showSelectedOptions: true,
                question: 'My Personal Values',
                label1: 'I\'m all done!'
            },
            {
                type: 'endActivity',
                showSelectedOptions: true,
                question: 'Great Job!',
                label1: 'Your activity is complete.',
            }
        ];
    }
    ngOnInit() {
    }
    // For Text Question Type
    onChange(event) {
        this.changed = !this.changed;
        this.textInput = event.target.value;
        this.textBox = this.textInput !== '' ? 'aft-text text-inp' : 'bef-text text-inp';
        this.save = this.textInput !== '' ? 'aft-sel' : 'bef-sel';
    }
    // Multi-Select
    goToNextQuestion(question) {
        console.log(question);
        console.log(this.count);
        if (this.count < this.activity[0].select.min - 1 || this.count > this.activity[0].select.max - 1) {
            return false;
        }
        this.selectedAnswers = question.select.dataOptions.filter(val => val.clicked === true);
        this.allAnswers.push({
            id: question.id,
            answer: this.selectedAnswers
        });
        // Save selected options from Multi-select question type
        this.activityService.setQuestion1Answers(this.allAnswers[0].answer).subscribe(res => {
            console.log('res: ', res);
        });
        // Save entered message in Text Question Type
        if (this.changed) {
            this.activityService.setQuestions3Answer(this.textInput).subscribe(res => {
                console.log('Text box question res: ', res);
            });
        }
        else {
            console.log('Text not entered..!');
        }
        this.selectedQuestion++;
        this.selectedOptions = this.activityService.getQuestion1Answers();
        console.log('All Answers ========> ', this.allAnswers);
    }
    // Text Area
    goToNextQuestion1() {
        // Save entered message in Text Question Type
        if (this.textInput.length > 1) {
            this.allAnswers.push({
                id: this.activity[1].id,
                answer: this.textInput
            });
            this.activityService.setQuestions3Answer(this.allAnswers[1].answer).subscribe(res => {
                console.log('Text box question res: ', res);
            });
        }
        else {
            console.log('Text not entered..!');
        }
        this.selectedQuestion++;
        this.selectedOptions = this.activityService.getQuestion1Answers();
        console.log('All Answers ========> ', this.allAnswers);
    }
    // Yes or No
    goToNextQuestion2() {
        if (this.clickedOption === undefined) {
            return false;
        }
        this.activity[2].questionsList[this.click].ans = this.selectedYes;
        // console.log('ans======>', this.activity[2].questionsList[this.click].ans);
        this.click++;
        if (this.click === this.activity[2].questionsList.length) {
            this.selectedQuestion++;
        }
        else {
            this.selectedYes = false;
            this.selectedNo = false;
        }
        this.clickedOption = undefined;
        for (let i = 0; i < this.activity[2].questionsList.length; i++) {
            if (this.activity[2].questionsList[i].ans != null) {
                this.booleanAnswers.push({
                    questionNo: this.activity[2].questionsList[i].id,
                    answer: this.activity[2].questionsList[i].ans
                });
            }
        }
        // Filtering Boolean Answers based on unique question numbers to avoid duplication
        const uniqueAnswers = Array.from(new Set(this.booleanAnswers.map(a => a.questionNo)))
            .map(id => {
            return this.booleanAnswers.find(a => a.questionNo === id);
        });
        console.log('Unique set ==========> ', uniqueAnswers);
        this.allAnswers.push({
            id: this.activity[2].id,
            Answers: uniqueAnswers
        });
        const finalAnswer = [...new Map(this.allAnswers.map(item => [item.id, item])).values()];
        this.activityService.setSelectedBoolean(finalAnswer).subscribe(res => {
            console.log('Boolean question saved res: ', res);
        });
        this.selectedOptions = this.activityService.getQuestion1Answers();
        this.savedMessage = this.activityService.getQuestion3Answer();
        console.log('Text area saved answer ', this.activityService.getQuestion3Answer());
    }
    // For yes or no question type
    selectOption(val) {
        this.clickedOption = true;
        if (val === 'yes') {
            this.selectedYes = true;
            this.selectedNo = false;
        }
        else {
            this.selectedYes = false;
            this.selectedNo = true;
        }
    }
    goToNextQuestion3() {
        this.selectedQuestion++;
        console.log('click--------------->', this.click);
    }
    endActivity() {
        this.router.navigate(['/']);
    }
    onCardSelection(selection, id, i) {
        const allSelected = this.activity[selection].select.dataOptions.filter(val => val.clicked === true);
        if (allSelected.length === this.activity[0].select.max) {
            if (!allSelected.find(val => val.id === id)) {
                return false;
            }
        }
        this.activity[0].select.dataOptions[i].clicked === true ?
            this.activity[0].select.dataOptions[i].clicked = false : this.activity[0].select.dataOptions[i].clicked = true;
        this.count = allSelected.length;
        if (this.count < this.activity[0].select.min - 1) {
            this.submit = 'bef-sel';
        }
        else {
            this.submit = 'aft-sel';
        }
    }
};
Activity1Component = tslib_1.__decorate([
    Component({
        selector: 'app-activity1',
        templateUrl: './activity1.component.html',
        styleUrls: ['./activity1.component.css']
    })
], Activity1Component);
export { Activity1Component };
//# sourceMappingURL=activity1.component.js.map