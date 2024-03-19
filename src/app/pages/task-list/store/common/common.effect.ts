import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { showAlert } from './common.action';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class CommonEffects {
  constructor(
    private action$: Actions,
    private snackBar: MatSnackBar,
  ) {}
  showAlert = createEffect(() =>
    this.action$.pipe(
      ofType(showAlert.showAlert),
      exhaustMap((action) => {
        return this.showSnack(action.message, action.result)
          .afterDismissed()
          .pipe(
            map(() => {
              return showAlert.empty();
            }),
          );
      }),
    ),
  );

  showSnack(message: string, result: string = 'Упс! Ошибка!') {
    const isFail = result === 'passed' ? 'green-alert' : 'red-alert';
    return this.snackBar.open(message, 'Ок', {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 2000,
      panelClass: [isFail],
    });
  }
}
