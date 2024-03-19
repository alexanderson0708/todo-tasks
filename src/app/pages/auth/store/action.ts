import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.inteface';

export const loginAction = createActionGroup({
  source: 'auth',
  events: {
    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failed': props<{ errors: BackendErrorsInterface }>(),
  },
});

export const getUsers = createActionGroup({
  source: 'auth',
  events: {
    'Get users': props<{ token: string }>(),
    'Get users success': props<{ users: CurrentUserInterface[] }>(),
    'Get users failed': props<{ errors: BackendErrorsInterface }>(),
  },
});

export const resetStore = createActionGroup({
  source: 'auth',
  events: {
    'Reset store': emptyProps(),
  },
});
