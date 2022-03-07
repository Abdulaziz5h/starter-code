import { UserService } from '@app/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _us: UserService) {}
  canActivate(): boolean {
    let isloggedIn = this._us.isLoggedIn();
    if (!isloggedIn) this.router.navigate(['/login']);
    return isloggedIn;
  }
}
