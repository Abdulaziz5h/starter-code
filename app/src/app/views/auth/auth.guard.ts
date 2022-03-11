import { map, Observable } from 'rxjs';
import { getCurrentUser } from '@app/store/auth/selector';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.store.select(getCurrentUser).pipe(
      map((is) => {
        if (!is) return this.router.createUrlTree(['/login']);
        return true;
      })
    );
  }
}
