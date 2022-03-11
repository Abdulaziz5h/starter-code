import { signupSuccess } from './../users/actions';
import { Router } from '@angular/router';
import { newQuestionSuccess } from './../questions/actions';
import { loginSuccess, logoutDone } from './../auth/actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { exhaustMap, tap } from 'rxjs';
import { setAlert, startAlert, resetAlert } from './action';
import { AlertService } from '@app/services/alert.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private _as: AlertService,
    private store: Store<AppState>,
    private router: Router
  ) {}
  setAlert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setAlert),
      exhaustMap((action) => {
        this.store.dispatch(startAlert({ alert: action.alert }));
        return this._as.startTime().then(() => {
          return resetAlert();
        });
      })
    );
  });
  RedirectToHome$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, newQuestionSuccess]),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    {
      dispatch: false,
    }
  );
  RedirectToLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[signupSuccess, logoutDone]),
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
    },
    {
      dispatch: false,
    }
  );
}
