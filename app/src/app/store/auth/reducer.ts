import { loginSuccess, loginFail, logoutDone, updateAuthedUser } from './actions';
import { AuthState, authState } from './state';
import { createReducer, Action, on } from '@ngrx/store';

export const _authReducer = createReducer(
  authState,
  on(...[loginSuccess, updateAuthedUser], (state, { user }) => {
    return {
      ...state,
      user,
    };
  }),
  on(loginFail, (state) => {
    return {
      ...state,
    };
  }),
  on(logoutDone, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
);

export function authReducer(state: AuthState, action: Action): any {
  return _authReducer(state, action);
}
