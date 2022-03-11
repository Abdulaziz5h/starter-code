import { setLoading, setAlert, resetAlert, setIsLoading } from './action';
import { SharedState } from './state';
import { createReducer, Action, on } from '@ngrx/store';
import { IAlert } from '@app/_models/IAlert.interface';
const _sharedReducer = createReducer(
  SharedState,
  on(setLoading, (state, props) => {
    return {
      ...state,
      loading: props.progress,
    };
  }),
  on(setIsLoading, (state, props) => {
    return {
      ...state,
      isLoading: props.status,
    };
  }),
  on(setAlert, (state, props) => {
    return {
      ...state,
      alert: props.alert,
    };
  }),
  on(resetAlert, (state) => {
    return {
      ...state,
      alert: <IAlert>{},
    };
  })
);

export const sharedReducer = (state: SharedState, action: Action): any => {
  return _sharedReducer(state, action);
};
