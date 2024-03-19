import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { getUsers, loginAction } from './action';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(loginAction.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token);
            return loginAction.loginSuccess({ currentUser });
          }),
          catchError((errorResponse) => {
            return of(
              loginAction.loginFailed({
                errors: errorResponse.error,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getUsersEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(getUsers.getUsers),
      switchMap(() => {
        return authService.getUsers().pipe(
          map((users: CurrentUserInterface[]) => {
            return getUsers.getUsersSuccess({ users: users });
          }),
          catchError((errorResponse) => {
            return of(
              getUsers.getUsersFailed({
                errors: errorResponse.error,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(loginAction.loginSuccess),
      tap(() => {
        router.navigateByUrl('/main/home');
      }),
    );
  },
  { functional: true, dispatch: false },
);
