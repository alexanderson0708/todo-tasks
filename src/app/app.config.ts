import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './pages/auth/store/reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as loginEffect from './pages/auth/store/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatNativeDateModule } from '@angular/material/core';
import {
  taskFeatureKey,
  taskReducer,
} from './pages/task-list/store/task/task.reducer';
import { TaskEffects } from './pages/task-list/store/task/task.effect';
import { CommonEffects } from './pages/task-list/store/common/common.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom(MatNativeDateModule),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(taskFeatureKey, taskReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(loginEffect, TaskEffects, CommonEffects),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
