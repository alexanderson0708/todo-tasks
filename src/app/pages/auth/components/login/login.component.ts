import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from '../../store/action';
import {
  LoginFormInterface,
} from '../../types/loginRequest.interface';
import { RouterLink } from '@angular/router';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { BEErrorComponent } from '../../../../shared/components/backErr.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BEErrorComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class LoginComponent {
  hide = true;
  form: FormGroup<LoginFormInterface>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backErrors: this.store.select(selectValidationErrors),
  });
  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        loginAction.login({ request: { user: this.form.getRawValue() } }),
      );
    }
  }
}
