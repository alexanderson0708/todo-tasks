import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.inteface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:3000/users';

  isLoggedIn = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .get<CurrentUserInterface[]>(`${this.baseUrl}?email=${data.user.email}`)
      .pipe(
        switchMap((users: CurrentUserInterface[]) => {
          const user = users[0] || null;
          if (!user) {
            return throwError(() => new Error('Пользователь не найден'));
          }
          if (user.password !== data.user.password) {
            return throwError(() => new Error('Неверный пароль'));
          }
          const { password, ...userWithoutPassword } = user;
          return of({ ...userWithoutPassword, password: '***' });
        }),
        catchError((e) => {
          const backendError: BackendErrorsInterface = { 400: [e.message] };
          return throwError(() => ({ error: backendError }));
        }),
      );
  }

  getUsers() {
    return this.http.get<CurrentUserInterface[]>(this.baseUrl).pipe(
      map((users) =>
        users.map(({ password, token, ...userWithoutPassword }) => ({
          ...userWithoutPassword,
          password: '***',
          token: '***',
        })),
      ),
      catchError((e) => {
        const backendError: BackendErrorsInterface = { 400: [e.message] };
        return throwError(() => ({ error: backendError }));
      }),
    );
  }

  logout() {
    localStorage.clear();
  }
}
