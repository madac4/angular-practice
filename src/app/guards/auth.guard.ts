import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (!authService.loggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
}

export function adminGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (!authService.isAdmin()) {
      router.navigate(['/']);
      return false;
    }

    return true;
  };
}
