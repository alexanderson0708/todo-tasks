import { FormControl } from '@angular/forms';

export interface Task {
  date: string;
  title: string;
  description: string;
  priority: Priority;
  userId: number;
  id: string;
}

export interface TaskForForm {
  date: string;
  title: string;
  description: string;
  priority: Priority;
  userId: number;
  name: string;
  avatar: string | undefined;
  id: string;
}

export enum Priority {
  LOW_PRIORITY = 'Низкий',
  AVERAGE_PRIORITY = 'Средний',
  HIGH_PRIORITY = 'Высокий',
}

export interface TaskModel {
  list: Task[];
  taksObj: Task;
  errorMsg: string;
  isLoading: boolean;
}

export interface DialogData {
  title: string;
}

export interface TaskFormInterface {
  date: FormControl<string | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  priority: FormControl<string | null>;
  user: FormControl<number | null>;
}

export type MonthMap = {
  [key: string]: string;
};