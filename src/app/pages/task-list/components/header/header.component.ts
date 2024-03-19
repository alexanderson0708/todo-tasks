import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { CurrentUserInterface } from '../../../../shared/types/currentUser.interface';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TitleService } from '../../../../shared/services/title.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    AddTaskComponent,
    MatTableModule,
    MatPaginator,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<CurrentUserInterface | null | undefined>;
  title = '';

  constructor(
    private store: Store,
    private titleService: TitleService,
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    this.titleService.currentTitle.subscribe((title) => {
      this.title = title;
    });
  }
}
