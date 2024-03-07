import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Store, select } from '@ngrx/store';
import { Task, TaskForForm } from '../../types/task.inteface';
import { selectIsLoading, selectList } from '../../store/task/task.reducer';
import { deleteTask, loadTask } from '../../store/task/task.action';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersistanceService } from '../../../../shared/services/persistance.service';
import { getUsers } from '../../../auth/store/action';
import { CurrentUserInterface } from '../../../../shared/types/currentUser.interface';
import { selectCurrentUser, selectUsers } from '../../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import {
  Observable,
  combineLatest,
  filter,
  forkJoin,
  of,
  switchMap,
} from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    AddTaskComponent,
    MatTableModule,
    MatPaginator,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  selectedValue = 'date';
  taskList: Task[] = [];
  userList: CurrentUserInterface[] = [];
  datasource!: MatTableDataSource<TaskForForm>;
  token: unknown;
  isLoadTask: boolean = false;
  currentUser$: Observable<CurrentUserInterface | null | undefined>;
  isLoading$: Observable<boolean>;
  displayedColumns: string[] = [
    'date',
    'userId',
    'priority',
    'title',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private persistanceService: PersistanceService,
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
  }

  ngOnInit(): void {
    this.token = this.persistanceService.get('accessToken');
    this.store.dispatch(loadTask.loadTasks());
    this.store.dispatch(
      getUsers.getUsers({
        token: typeof this.token === 'string' ? this.token : '',
      }),
    );

    combineLatest([
      this.store.select(selectList),
      this.store
        .select(selectUsers)
        .pipe(filter((userList) => userList.length > 0)),
    ])
      .pipe(
        switchMap(([tasks, users]) => {
          if (!tasks.length) return of([]);
          this.userList = users;
          const taskPromises = tasks.map((task) => {
            return Promise.all([
              this.getUserName(+task.userId),
              this.getUserAvatarUrl(+task.userId),
            ]).then(([name, avatar]) => ({
              ...task,
              name,
              avatar,
            }));
          });

          return forkJoin(taskPromises);
        }),
      )
      .subscribe(async (transformedTasks) => {
        this.datasource = new MatTableDataSource(transformedTasks);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        this.isLoadTask = true;
      });
  }

  addTask() {
    this.openPopup(0, 'Create task');
  }

  openPopup(code: number, title: string) {
    this.dialog.open(AddTaskComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        code: code,
        title: title,
      },
    });
  }

  removeTask(id: string) {
    if (confirm('Вы действительно хотите удалить эту задачу?')) {
      this.store.dispatch(deleteTask.deleteTask({ id: id }));
    }
  }

  getUserName(userId: number): string {
    const user = this.userList.find((user) => +user.id === userId);
    return user ? user.displayName : 'Неизвестный пользователь';
  }

  getUserAvatarUrl(userId: number): string | undefined {
    const user = this.userList.find((user) => +user.id === userId);
    return user ? user.avatar : undefined;
  }
  onChange() {
    this.sortData(this.selectedValue);
  }
  sortData(selectedValue: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, ...dataForSort } = this.datasource;

    switch (selectedValue) {
      case 'title':
        this.datasource.data = this.sortByTitle(data);
        break;
      case 'priority':
        this.datasource.data = this.sortByPriority(data);
        break;
      case 'name':
        this.datasource.data = this.sortByName(data);
        break;
      default:
        this.datasource.data = this.sortByDate(data);
        break;
    }
  }

  sortByDate(arr: TaskForForm[]) {
    const sortedData = arr.sort((a: TaskForForm, b: TaskForForm) => {
      return (
        this.convertDateStrToDateObject(a.date).getTime() -
        this.convertDateStrToDateObject(b.date).getTime()
      );
    });
    return sortedData;    
  }

  sortByTitle(arr: TaskForForm[]) {
    const sortedData = arr.sort((a: TaskForForm, b: TaskForForm) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    return sortedData;
  }

  sortByName(arr: TaskForForm[]) {
    const sortedData = arr.sort((a: TaskForForm, b: TaskForForm) => {
      const titleA = a.name.toLowerCase();
      const titleB = b.name.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    return sortedData;
  }

  sortByPriority(arr: TaskForForm[]) {
    const priorityMap = {
      Низкий: 1,
      Средний: 2,
      Высокий: 3,
    };
    const sortedData = arr.sort((a: TaskForForm, b: TaskForForm) => {
      return priorityMap[b.priority] - priorityMap[a.priority];
    });
    return sortedData;
  }

  convertDateStrToDateObject(dateStr: string): Date {
    const parts: string[] = dateStr.split('-');
    const day = parts[2];
    const month: string = parts[1];
    const year = parts[0];
    return new Date(+year, +month + 1, +day);
  }

  formatDate(dateForTransform: string) {
    const regex = /^(\d{2})\s([а-яА-Я]+)\s(\d{4})$/;
    const matches = dateForTransform.match(regex);

    if (!matches) {
      const date = new Date(dateForTransform);
      const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      return formatter.format(date).replace(/г\.$/, '');
    } else {
      return dateForTransform;
    }
  }
}
