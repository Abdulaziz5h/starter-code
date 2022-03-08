import { UserService } from '@app/services/user.service';
import { IUser } from './../../../../_models/IUser';
import { IQuestion } from '@app/_models/IQuestion';
import { QuestionsService } from '@app/services/question.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private _qs: QuestionsService,
    private _us: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (!this._qs.questions.length) {
      this._us.fetchUsers().then(() => {
        this._qs.fetchQuestions().then(() => {
          this.question = this._qs.getQuestionById(id);
          this.user = this._us.getUserById(this.question.author);
        });
      });
    } else {
      this.question = this._qs.getQuestionById(id);
      this.user = this._us.getUserById(this.question.author);
    }
  }
  saveAnswer(ans: string) {
    this._qs.saveQuestionAnswer({
      answer: ans,
      authedUser: this._us.user.id,
      qid: this.question.id,
    });
  }
  isAnswered(qId: string) {
    return !!this._us.user.answers[qId];
  }
}
