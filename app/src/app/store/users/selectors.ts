export const USER_STATE_NAME = 'users';
import { UserState } from './state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getUsersState = createFeatureSelector<UserState>(USER_STATE_NAME);

export const getUsers = createSelector(getUsersState, (state) =>
  Object.keys(state._users).map((k) => state._users[k])
);

export const getUserById = (props: { id: string }) =>
  createSelector(getUsersState, (state) => {
    if (props.id) return state._users[props.id];
    else return false;
  });
