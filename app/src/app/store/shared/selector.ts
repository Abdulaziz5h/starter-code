export const SHARED_STATE_NAME = 'shared';
import { SharedState } from './state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
const getSharedSelector = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const loadingSelector = createSelector(
  getSharedSelector,
  (state) => state.loading
);
export const isLoadingSelector = createSelector(
  getSharedSelector,
  (state) => state.isLoading
);
export const alertSelector = createSelector(
  getSharedSelector,
  (state) => state.alert
);
