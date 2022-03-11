export const AUTH_STATE_NAME = 'auth';
import { AuthState } from './state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
const authSelector = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const authinticatedUser = createSelector(authSelector, (state) => {
  return state.user;
});

export const getCurrentUser = createSelector(
  authSelector,
  (state) => state.user
);
