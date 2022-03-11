import { AuthService } from '@app/services/auth.service';
import {
  signupSuccess,
  signupFail,
  getAllUsers,
  getAllUsersSuccess,
} from './actions';
import { UserService } from '@app/services/user.service';
import { signup } from '@app/store/users/actions';
import { Store } from '@ngrx/store';
import { setAlert, setLoading } from './../shared/action';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap } from 'rxjs';
import { AppState } from '../app.state';

@Injectable()
export class UserEffects {
  constructor(
    private _us: UserService,
    private _as: AuthService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
  getAllUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllUsers),
      exhaustMap(() => {
        return this._us.fetchUsers().then((users) => {
          // ----- this to fix lost API
          const currentUser = this._as.getUserData();
          if (currentUser && !users[currentUser.id])
            this.store.dispatch(signup(currentUser));
          // -----
          return getAllUsersSuccess({ users });
        });
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signup),
      exhaustMap((action) => {
        this.store.dispatch(setLoading({ progress: 40 }));
        return this._us
          .saveUser({
            answers: action.answers,
            avatarURL: action.avatarURL,
            id: action.id,
            name: action.name,
            questions: action.questions,
          })
          .then((data) => {
            this.store.dispatch(setLoading({ progress: 100 }));
            this.store.dispatch(
              setAlert({
                alert: {
                  message: 'User Added Successfuliy',
                  type: 'success',
                  active: true,
                },
              })
            );
            return signupSuccess({ user: data });
          })
          .catch((err) => {
            this.store.dispatch(setLoading({ progress: 100 }));
            this.store.dispatch(
              setAlert({
                alert: {
                  message: err.message,
                  type: 'danger',
                  active: true,
                },
              })
            );
            return signupFail();
          });
      })
    );
  });
}
