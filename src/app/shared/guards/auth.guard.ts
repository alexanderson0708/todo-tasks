import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuth = localStorage.getItem('accessToken');

  if (isAuth !== null) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return true;
  }
};
