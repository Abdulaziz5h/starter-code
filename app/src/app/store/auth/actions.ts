import { AuthActionsTypes } from './auth-actions-types';
import { createAction, props } from '@ngrx/store';
import { IUser } from '@app/_models/IUser.interface';
export const loginStart = createAction(
  AuthActionsTypes.loginStart,
  props<{ id: string }>()
);
export const loginSuccess = createAction(
  AuthActionsTypes.loginSuccess,
  props<{ user: IUser }>()
);
export const loginFail = createAction(AuthActionsTypes.loginFail);
export const autoLogin = createAction(AuthActionsTypes.autoLogin);
export const logout = createAction(AuthActionsTypes.logout);
export const logoutDone = createAction(AuthActionsTypes.logoutDone);
export const updateAuthedUser = createAction(
  AuthActionsTypes.updateAuthedUser,
  props<{ user: IUser }>()
);
