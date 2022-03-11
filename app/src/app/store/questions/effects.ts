import { userAddQuestion, setNewQuestionAnswer } from './../users/actions';
import { setAlert, setLoading } from './../shared/action';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import {
  newQuestionSuccess,
  newQuestionFail,
  fetchQuestions,
  fetchQuestionsSuccess,
  fetchQuestionsFail,
  saveQuestionAnswerSuccess,
  saveQuestionAnswerFail,
} from './actions';
import { exhaustMap } from 'rxjs';
import { newQuestion, saveQuestionAnswer } from '@app/store/questions/actions';
import { QuestionsService } from '@app/services/question.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
@Injectable()
export class QuestionEffects {
  constructor(
    private actions$: Actions,
    private _qs: QuestionsService,
    private store: Store<AppState>
  ) {}
  fetchQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchQuestions),
      exhaustMap(() => {
        this.store.dispatch(setLoading({ progress: 40 }));
        return this._qs
          .fetchQuestions()
          .then((_questions) => {
            this.store.dispatch(setLoading({ progress: 100 }));
            return fetchQuestionsSuccess({ _questions });
          })
          .catch((err) => {
            this.store.dispatch(
              setAlert({
                alert: {
                  message: err.message,
                  type: 'danger',
                  active: true,
                },
              })
            );
            this.store.dispatch(setLoading({ progress: 100 }));
            return fetchQuestionsFail();
          });
      })
    );
  });
  newQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newQuestion),
      exhaustMap((action) => {
        this.store.dispatch(setLoading({ progress: 40 }));
        return this._qs
          .saveQuestion(action.question)
          .then((question) => {
            this.store.dispatch(setLoading({ progress: 100 }));
            this.store.dispatch(
              setAlert({
                alert: {
                  message: 'your question added successfuliy!',
                  type: 'success',
                  active: true,
                },
              })
            );
            this.store.dispatch(
              userAddQuestion({ qId: question.id, userId: question.author })
            );
            return newQuestionSuccess({ question });
          })
          .catch((err) => {
            this.store.dispatch(
              setAlert({
                alert: {
                  message: err.message,
                  type: 'danger',
                  active: true,
                },
              })
            );
            this.store.dispatch(setLoading({ progress: 100 }));
            return newQuestionFail();
          });
      })
    );
  });
  saveQuestionAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveQuestionAnswer),
      exhaustMap((action) => {
        this.store.dispatch(setLoading({ progress: 40 }));
        return this._qs
          .saveQuestionAnswer(action.questionAns)
          .then(() => {
            this.store.dispatch(
              setNewQuestionAnswer({
                questionAns: action.questionAns,
              })
            );
            this.store.dispatch(setLoading({ progress: 100 }));
            this.store.dispatch(
              setAlert({
                alert: {
                  message: 'your answer saved successfully!',
                  type: 'success',
                  active: true,
                },
              })
            );
            return saveQuestionAnswerSuccess({
              questionAns: action.questionAns,
            });
          })
          .catch((err) => {
            this.store.dispatch(
              setAlert({
                alert: {
                  message: err.message,
                  type: 'danger',
                  active: true,
                },
              })
            );
            this.store.dispatch(setLoading({ progress: 100 }));
            return saveQuestionAnswerFail();
          });
      })
    );
  });
}
