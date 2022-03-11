import { authinticatedUser } from '@app/store/auth/selector';
import { isLoadingSelector } from '@app/store/shared/selector';
import { Store } from '@ngrx/store';
import { IUser } from '@app/_models/IUser.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/store/app.state';
import { logout } from '@app/store/auth/actions';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: IUser = <IUser>{};
  isLoading: boolean = false;
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select(isLoadingSelector).subscribe((is) => {
      this.isLoading = is;
    });
    this.store.select(authinticatedUser).subscribe((u) => {
      this.user = <IUser>u;
    });
  }
  ngOnInit() {}
  isActive(path: string) {
    return this.router.url == path;
  }
  logout() {
    this.store.dispatch(logout());
  }
}
