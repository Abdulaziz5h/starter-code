import { sharedActionsTypes } from './shared-actions-types';
import { createAction, props } from '@ngrx/store';
import { IAlert } from '@app/_models/IAlert.interface';

export const setLoading = createAction(
  sharedActionsTypes.setLoading,
  props<{ progress: number }>()
);
export const setIsLoading = createAction(
  sharedActionsTypes.setIsLoading,
  props<{ status: boolean }>()
);
export const setAlert = createAction(
  sharedActionsTypes.setAlert,
  props<{ alert: IAlert }>()
);
export const startAlert = createAction(
  sharedActionsTypes.startAlert,
  props<{ alert: IAlert }>()
);
export const resetAlert = createAction(sharedActionsTypes.resetAlert);
