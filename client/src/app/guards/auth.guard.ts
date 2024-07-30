import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

export const canActivate: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const dataService = inject(DataService);
  const router = inject(Router);

  if (!dataService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
