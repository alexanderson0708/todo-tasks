import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { resetStore } from '../../../auth/store/action';
import { resetStoreTask } from '../../store/task/task.action';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLinkActive,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  options: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private store: Store,
    private router: Router,
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(resetStore.resetStore());
    this.store.dispatch(resetStoreTask.resetStore());
    this.router.navigateByUrl('/login');
  }
}
