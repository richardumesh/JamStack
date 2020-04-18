import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { GeneralHttpService } from '../services/general-http.service';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  questions1Answers = [];
  question3Answer = '';
  booleanQAnswer = [];
  allAnswers = [];
  constructor(private https: GeneralHttpService) { }

  getAccessToken(token): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'student/opened';
    return this.https.genericPostNoToken(endPoint, { key: token });
  }
  answerQuestion(payload): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'student/answer';
    return this.https.genericPost(endPoint, payload);
  }
  setQuestion1Answers(questions1Answers): Observable<any> {
    this.questions1Answers = questions1Answers;
    this.allAnswers.push(questions1Answers);
    return new Observable(obs => obs.next(questions1Answers));
  }
  complete(payload): Observable<any> {
    const endPoint = environment.BASEURL + environment.VERSION_URL + 'student/completed';
    return this.https.genericPost(endPoint, payload);
  }

  getQuestion1Answers() {
    return this.questions1Answers;
  }

  setQuestions3Answer(textInput): Observable<any> {
    this.question3Answer = textInput;
    this.allAnswers.push(this.question3Answer);
    return new Observable(obs => obs.next(textInput));
  }

  getQuestion3Answer() {
    return this.question3Answer;
  }

  setSelectedBoolean(option): Observable<any> {
    this.booleanQAnswer = option;
    this.allAnswers.push(this.booleanQAnswer);
    return new Observable(obs => obs.next(option));
  }

}