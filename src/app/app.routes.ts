import { Route } from '@angular/router';
import { TaskListComponent } from './pages/task-list/taksPage.component';
import { TaskMainComponent } from './pages/task-list/components/main-task/main-task.component';
import { TasksComponent } from './pages/task-list/components/tasks/tasks.component';
import { authGuard } from './shared/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.routes').then((x) => x.loginRoutes),
  },
  {
    path: 'main',
    component: TaskListComponent,
    canActivate: [authGuard],
    children: [
      { path: 'task', component: TasksComponent },
      { path: 'home', component: TaskMainComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () => import('./pages/auth/auth.routes').then((x) => x.loginRoutes),
  },
];

