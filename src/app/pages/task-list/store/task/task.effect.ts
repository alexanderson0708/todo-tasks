import { Injectable } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addTask, deleteTask, loadTask } from './task.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from '../common/common.action';

@Injectable()
export class TaskEffects {
  constructor(
    private action$: Actions,
    private taskService: TaskService,
  ) {}
  loadTask = createEffect(() =>
    this.action$.pipe(
      ofType(loadTask.loadTasks),
      exhaustMap(() => {
        return this.taskService.getAllTasks().pipe(
          map((data) => {
            return loadTask.loadTasksSuccess({ list: data });
          }),
          catchError((error) =>
            of(loadTask.loadTasksFailed({ errorMsg: error.message })),
          ),
        );
      }),
    ),
  );

  addTask = createEffect(() =>
    this.action$.pipe(
      ofType(addTask.addTask),
      switchMap((action) => {
        return this.taskService.createTask(action.data).pipe(
          switchMap(() => {
            return of(
              addTask.addTaskSuccess({ data: action.data }),
              showAlert.showAlert({
                message: 'Задача успешно создана!',
                result: 'passed',
              }),
            );
          }),
          catchError(() =>
            of(
              showAlert.showAlert({
                message: 'Что то пошло не так!',
                result: 'failed',
              }),
            ),
          ),
        );
      }),
    ),
  );

  deleteTask = createEffect(() =>
    this.action$.pipe(
      ofType(deleteTask.deleteTask),
      switchMap((action) => {
        return this.taskService.deleteTask(action.id).pipe(
          switchMap(() => {
            return of(
              deleteTask.deleteTaskSuccess({ id: action.id }),
              showAlert.showAlert({
                message: 'Задача успешно удалена!',
                result: 'passed',
              }),
            );
          }),
          catchError(() =>
            of(
              showAlert.showAlert({
                message: 'Что то пошло не так!',
                result: 'failed',
              }),
            ),
          ),
        );
      }),
    ),
  );
}
