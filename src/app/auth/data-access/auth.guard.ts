import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  authSvc.updateUser();

  if (!authSvc.user()?.isValid) {
    return router.navigateByUrl('/login');
  }

  return true;
};
