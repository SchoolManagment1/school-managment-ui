import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export function roleGuard(expectedRoles: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const role = authService.getUserRole();

    if (role && expectedRoles.includes(role)) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  };
}
