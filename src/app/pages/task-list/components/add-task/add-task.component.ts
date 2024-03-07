import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addTask } from '../../store/task/task.action';
import {
  DialogData,
  MonthMap,
  Priority,
  Task,
  TaskFormInterface,
} from '../../types/task.inteface';
import { getUsers } from '../../../auth/store/action';
import { PersistanceService } from '../../../../shared/services/persistance.service';
import { CurrentUserInterface } from '../../../../shared/types/currentUser.interface';
import { selectUsers } from '../../../auth/store/reducers';
import { selectList } from '../../store/task/task.reducer';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  title = 'Создание новой задачи';
  dialogData: DialogData | undefined;
  token: unknown;
  userList: CurrentUserInterface[] = [];
  taskList: Task[] = [];
  maxId: number = 0;
  addTaskForm: FormGroup<TaskFormInterface>;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store,
    private persistanceService: PersistanceService,
  ) {
    this.addTaskForm = this.fb.group({
      date: this.fb.control(
        this.formatDate(new Date()),
        this.validateDateString,
      ),
      title: this.fb.control('', Validators.required),
      description: this.fb.control(''),
      priority: this.fb.control('Средний', Validators.required),
      user: this.fb.control(0, Validators.required),
    });
  }

  ngOnInit(): void {
    this.persistanceService.set('accessToken', 'abcdef123456'); //imitation
    this.token = this.persistanceService.get('accessToken');
    this.store.dispatch(
      getUsers.getUsers({
        token: typeof this.token === 'string' ? this.token : '',
      }),
    );
    (this.dialogData = this.data), (this.title = this.dialogData.title);
    this.store.select(selectUsers).subscribe((item) => {
      this.userList = item;
    });
    this.store.select(selectList).subscribe((item) => {
      this.taskList = item;
      this.maxId = Math.max(...item.map((el) => +el.id));
    });
  }

  closePopup() {
    this.ref.close();
  }

  saveTask() {
    if (this.addTaskForm.valid) {
      const taskData: Task = {
        id: `${this.maxId + 1}`,
        date: this.convertDate(this.addTaskForm.value.date) as string,
        title: this.addTaskForm.value.title as string,
        description: this.addTaskForm.value.description as string,
        priority: this.addTaskForm.value.priority as Priority,
        userId: this.addTaskForm.value.user as number,
      };
      this.store.dispatch(addTask.addTask({ data: taskData }));
      this.closePopup();
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('ru-RU', options);
    return formattedDate.replace(' г.', '');
  }

  validateDateString(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const regex = /^\d{2}\s[а-яА-Я]+\s\d{4}$/;
      const valid = regex.test(control.value);
      return valid ? null : { invalidDateFormat: { value: control.value } };
    };
  }

  convertDate(inputDate: string | null | undefined): string {
    const months: MonthMap = {
      января: '01',
      февраля: '02',
      марта: '03',
      апреля: '04',
      мая: '05',
      июня: '06',
      июля: '07',
      августа: '08',
      сентября: '09',
      октября: '10',
      ноября: '11',
      декабря: '12',
    };
    if (inputDate) {
      const parts: string[] = inputDate.split(' ');
      if (parts.length !== 3) {
        throw new Error('Некорректный формат входной строки');
      }
      const day: string = parts[0].padStart(2, '0');
      const month: string = months[parts[1]];
      if (!month) {
        throw new Error('Некорректное название месяца');
      }
      const year: string = parts[2];
      return `${year}-${month}-${day}`;
    } else {
      return '';
    }
  }
}
