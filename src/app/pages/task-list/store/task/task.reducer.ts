import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskState } from './task.state';
import { addTask, deleteTask, loadTask, resetStoreTask } from './task.action';

const tasksFeature = createFeature({
  name: 'task',
  reducer: createReducer(
    TaskState,
    on(loadTask.loadTasks, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(loadTask.loadTasksSuccess, (state, action) => {
      return {
        ...state,
        list: [...action.list],
        isLoading: false,
        errorMsg: '',
      };
    }),
    on(loadTask.loadTasksFailed, (state, action) => {
      return {
        ...state,
        list: [],
        isLoading: false,
        errorMsg: action.errorMsg,
      };
    }),
    on(addTask.addTask, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(addTask.addTaskSuccess, (state, action) => {
      const newTask = { ...action.data };
      return {
        ...state,
        list: [...state.list, newTask],
        isLoading: false,
        errorMsg: '',
      };
    }),
    on(deleteTask.deleteTask, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(deleteTask.deleteTaskSuccess, (state, action) => {
      const newData = state.list.filter((el) => el.id !== action.id);
      return {
        ...state,
        list: newData,
        isLoading: false,
        errorMsg: '',
      };
    }),
    on(resetStoreTask.resetStore, () => {
      return {
        ...TaskState,
      };
    }),
  ),
});

export const {
  name: taskFeatureKey,
  reducer: taskReducer,
  selectTaskState,
  selectList,
  selectErrorMsg,
  selectTaksObj,
  selectIsLoading,
} = tasksFeature;
