import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const showAlert = createActionGroup({
  source: 'common',
  events: {
    empty: emptyProps(),
    'show alert': props<{ message: string; result: string }>(),
  },
});
