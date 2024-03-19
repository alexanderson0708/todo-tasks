import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Task } from '../../types/task.inteface';

export const loadTask = createActionGroup({
  source: 'task',
  events: {
    'Load tasks': emptyProps(),
    'Load tasks success': props<{ list: Task[] }>(),
    'Load tasks failed': props<{ errorMsg: string }>(),
  },
});

export const addTask = createActionGroup({
  source: 'task',
  events: {
    'Add task': props<{ data: Task }>(),
    'Add task success': props<{ data: Task }>(),
  },
});

export const deleteTask = createActionGroup({
  source: 'task',
  events: {
    'Delete task': props<{ id: string }>(),
    'Delete task success': props<{ id: string }>(),
  },
});

export const resetStoreTask = createActionGroup({
  source: 'task',
  events: {
    'Reset store': emptyProps(),
  },
});
