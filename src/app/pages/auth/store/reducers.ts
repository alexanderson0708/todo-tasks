import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { getUsers, loginAction, resetStore } from './action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
  users: [],
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(loginAction.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      users: [],
    })),
    on(loginAction.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      validationErrors: null,
      users: [],
    })),
    on(loginAction.loginFailed, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
      users: [],
    })),
    on(getUsers.getUsers, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
      users: [],
    })),
    on(getUsers.getUsersSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
      users: [...action.users],
    })),
    on(getUsers.getUsersFailed, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
      users: [],
    })),
    on(resetStore.resetStore, () => ({
      ...initialState,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
  selectUsers,
} = authFeature;
