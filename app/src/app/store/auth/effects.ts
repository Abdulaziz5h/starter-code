import {
  saveQuestionAnswerSuccess,
  newQuestionSuccess,
} from './../questions/actions';
import { Store } from '@ngrx/store';
import { setAlert, setLoading } from './../shared/action';
import {
  loginStart,
  loginSuccess,
  loginFail,
  autoLogin,
  logout,
  logoutDone,
  updateAuthedUser,
} from './actions';
import { AuthService } from '@app/services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs';
import { AppState } from '../app.state';

@Injectable()
export class AuthEffects {
  constructor(
    private _as: AuthService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setLoading({ progress: 40 }));
        return this._as
          .login(action.id)
          .then((data) => {
            this.store.dispatch(setLoading({ progress: 100 }));
            this.store.dispatch(
              setAlert({
                alert: {
                  message: 'welcome back!,' + data.name,
                  type: 'success',
                  active: true,
                },
              })
            );
            this._as.saveUserData(data);
            return loginSuccess({ user: data });
          })
          .catch((error) => {
            this.store.dispatch(setLoading({ progress: 100 }));
            this.store.dispatch(
              setAlert({
                alert: {
                  message: error.message,
                  type: 'danger',
                },
              })
            );
            return loginFail();
          });
      })
    );
  });
  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogin),
        tap(() => {
          const user = this._as.getUserData();
          this.store.dispatch(updateAuthedUser({ user }));
        })
      );
    },
    { dispatch: false }
  );
  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      map(() => {
        this._as.logout();
        return logoutDone();
      })
    );
  });
  updateAuthedUserDataNewAnswer$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(saveQuestionAnswerSuccess),
        map(({ questionAns }) => {
          let user = this._as.getUserData();
          user = {
            ...user,
            answers: {
              ...user.answers,
              [questionAns.qid]: questionAns.answer,
            },
          };
          this._as.saveUserData(user);
          this.store.dispatch(updateAuthedUser({ user }));
        })
      );
    },
    {
      dispatch: false,
    }
  );
  updateAuthedUserDataNewQuestion$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(newQuestionSuccess),
        map(({ question }) => {
          let user = this._as.getUserData();
          user = {
            ...user,
            questions: [...user.questions, question.id],
          };
          this._as.saveUserData(user);
          this.store.dispatch(updateAuthedUser({ user }));
        })
      );
    },
    {
      dispatch: false,
    }
  );
}
