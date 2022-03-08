import { AlertService } from './../../../../services/alert.service';
import { UserService } from '@app/services/user.service';
import { IUser } from './../../../../_models/IUser';
import { IQuestion } from '@app/_models/IQuestion';
import { QuestionsService } from '@app/services/question.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  user: IUser = {
    id: '',
    name: '',
    avatarURL: '',
    questions: [],
    answers: {},
  };
  question: IQuestion = {
    id: '',
    author: '',
    optionOne: { text: '' },
    optionTwo: { text: '' },
    timestamp: 0,
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _as: AlertService,
    private _qs: QuestionsService,
    private _us: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['question_id'];
    if (!this._qs.questions.length) {
      this._us.fetchUsers().then(() => {
        this._qs.fetchQuestions().then(() => {
          this.question = this._qs.getQuestionById(id);
          if (!this.question) {
            this.go4o4();
          } else {
            this.user = this._us.getUserById(this.question.author);
          }
        });
      });
    } else {
      this.question = this._qs.getQuestionById(id);
      if (!this.question) {
        this.go4o4();
      } else {
        this.user = this._us.getUserById(this.question.author);
      }
    }
  }
  go4o4() {
    this.router.navigate(['/page-not-found']);
  }
  saveAnswer(ans: string) {
    this._qs
      .saveQuestionAnswer({
        answer: ans,
        authedUser: this._us.user.id,
        qid: this.question.id,
      })
      .then(() => {
        this._as.alert({
          type: 'success',
          message: 'your answer saved successfully!',
        });
      });
  }
  isAnswered(qId: string) {
    return !!this._us.user.answers[qId];
  }
}
