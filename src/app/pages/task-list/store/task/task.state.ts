import { Priority, TaskModel } from '../../types/task.inteface';

export const TaskState: TaskModel = {
  list: [],
  taksObj: {
    date: '',
    title: '',
    description: '',
    priority: Priority.AVERAGE_PRIORITY,
    userId: 0,
    id: '',
  },
  isLoading: false,
  errorMsg: '',
};
