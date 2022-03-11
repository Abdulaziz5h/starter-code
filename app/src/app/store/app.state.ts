import { AuthState } from './auth/state';
import { authReducer } from '@app/store/auth/reducer';
import { QUESTIONS_STATE_NAME } from './questions/selectors';
import { USER_STATE_NAME } from './users/selectors';
import { SharedState } from './shared/state';
import { SHARED_STATE_NAME } from './shared/selector';
import { questionsReducer } from './questions/reducer';
import { QuestionState } from './questions/state';
import { sharedReducer } from './shared/reducer';
import { usersReducer } from './users/reducer';
import { UserState } from './users/state';
import { AUTH_STATE_NAME } from './auth/selector';
export interface AppState {
  [USER_STATE_NAME]: UserState;
  [QUESTIONS_STATE_NAME]: QuestionState;
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
}
export const appReducer = {
  [USER_STATE_NAME]: usersReducer,
  [QUESTIONS_STATE_NAME]: questionsReducer,
  [SHARED_STATE_NAME]: sharedReducer,
  [AUTH_STATE_NAME]: authReducer,
};
