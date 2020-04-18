import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-activity1',
  templateUrl: './activity1.component.html',
  styleUrls: ['./activity1.component.scss']
})
export class Activity1Component implements OnInit {
  currentIndex = -1;
  showDone = false;
  // Variables used for Multi-Select Question Type
  count = 0;
  loading = false;
  selectedAnswers = [];
  submit = 'bef-sel';
  showReview = false;
  // Variables used for Text Question Type
  // selectedOptions = [];
  textBox = 'bef-text text-inp';
  changed = false;
  save = 'bef-sel';
  textInput = '';
  allAnswers = [];
  booleanAnswers = [];
  disabled = true;
  // Variables used for Yes or No Question Type
  selectedBoolean = [];
  selectedYes = false;
  selectedNo = false;
  questionsList = [];
  click = 0;
  clickedOption = undefined;

  // Variable used for Saved Data Question Type
  // savedMessage;
  showActivity = false;
  showError = false;
  selectedQuestion = 0;
  key;


  activity: any = {
    questions: [{
      questionId: 'question1',
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
      questionId: 'question2',
      id: 'text',
      type: 'text',
      showSelectedOptions: true,
      question: '',
      label1: 'Think about times when these values were very important to you. Describe why these values are important to you.',
      label2: 'Focus on your thoughts and feelings and dont worry about spelling and how its written.'
    },
    {
      questionId: 'question3',
      id: 'boolean',
      type: 'yesno',
      showSelectedOptions: true,
      question: 'My Personal Values',
      label1: 'In general, I try to live up to these things.',
      options: ['Yes', 'No']
    },
    {
      questionId: 'question4',
      id: 'boolean',
      type: 'yesno',
      showSelectedOptions: true,
      question: 'My Personal Values',
      label1: 'These things are an important part of who I am',
      options: ['Yes', 'No']
    },
    {
      questionId: 'question5',
      id: 'boolean',
      type: 'yesno',
      showSelectedOptions: true,
      question: 'My Personal Values',
      label1: 'I care about these things.',
      options: ['Yes', 'No']
    },
    ]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private toast: ToastrService,
    private auth: AuthService
  ) {
    this.route.params.subscribe((params: any) => {
      this.key = params.key;
      console.log(this.key);
      this.activityService.getAccessToken(this.key).subscribe(data => {
        console.log(data);
        if (data.is_success && data.result.topicDetails) {
          this.auth.setUserData({
            firstName: '',
            lastName: '',
            email: '',
            token: data.result.token
          });
          if (data.result.topicDetails.completed) {
            this.showDone = true;
          } else {
            this.currentIndex = data.result.topicDetails.answers.length ? data.result.topicDetails.answers.length : -1;
            console.log(this.currentIndex)
            if (this.currentIndex === this.activity.questions.length) {
              this.showReview = true;
            }
            for (const question of this.activity.questions) {
              for (const answer of data.result.topicDetails.answers) {
                if (question.questionId === answer.questionId) {
                  question.answer = answer.answer;
                }
              }
            }
          }
          this.showActivity = true;
        } else {
          this.showError = true;
        }
      }, error => {
        this.showError = true;
      });
    });
  }

  ngOnInit() {
  }
  yesNo(question, answer) {
    question.answer = answer;
    question.answered = true;
  }
  nextQuestion() {
    console.log(this.activity.questions[this.currentIndex])
    if (this.activity.questions[this.currentIndex].answered) {
      let answer;
      if (typeof this.activity.questions[this.currentIndex].answer === 'string') {
        answer = this.activity.questions[this.currentIndex].answer;
      } else {
        answer = JSON.stringify(this.activity.questions[this.currentIndex].answer);
      }
      const payload = {
        answer: answer,
        questionId: this.activity.questions[this.currentIndex].questionId,
        key: this.key
      };
      this.loading = true;
      this.activityService.answerQuestion(payload).subscribe(data => {
        if (data.is_success) {
          this.currentIndex++;
          if (this.currentIndex === this.activity.questions.length) {
            this.showReview = true;
          }
        } else {
          this.toast.error('Something went wrong!', 'error !');
        }
        this.loading = false;
      }, error => {
        this.toast.error('Something went wrong!', 'error !');
        this.loading = false;
      });
    }
  }

  textChanged(question) {
    if (question.answer) {
      question.answered = true;
    } else {
      question.answered = false;
    }
  }

  get selectedOptions() {
    if (typeof this.activity.questions[0].answer === 'string') {
      return JSON.parse(this.activity.questions[0].answer);
    } else {
      return this.activity.questions[0].answer;
    }
  }

  get savedMessage() {
    return this.activity.questions[1].answer;
  }
  navigate() {
    this.router.navigate(['/']);
  }

  cardSelected(card, question) {
    if (!question.answer) {
      question.answer = [];
    }
    if (!card.clicked) {
      if (question.answer && question.answer.length < question.select.max) {
        card.clicked = true;
      }
    } else {
      card.clicked = !card.clicked;
    }
    const allSelected = question.select.dataOptions.filter(val => val.clicked === true);
    question.answer = allSelected;
    if (allSelected.length >= question.select.min) {
      question.answered = true;
    } else {
      question.answered = false;
    }
  }

  done() {
    this.loading = true;
    this.activityService.complete({ key: this.key }).subscribe(data => {
      this.showDone = true;
      this.showReview = false;
      this.loading = false;
    }, error => {
      this.toast.error('Something went wrong!', 'error !');
      this.loading = false;
    });
  }
}