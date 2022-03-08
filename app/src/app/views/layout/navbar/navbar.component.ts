import { LoadingService } from './../loading/loading.service';
import { IUser } from './../../../_models/IUser';
import { UserService } from '@app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user!: IUser | null;
  loaded: number = 100;
  constructor(
    private router: Router,
    private _us: UserService,
    private _ls: LoadingService
  ) {
    this._us.userSubject.subscribe((user) => {
      this.user = user;
    });
    this._ls._progressSubject.subscribe((p) => {
      this.loaded = p;
    })
  }
  ngOnInit() {
    this._us.getCurrestUser();
  }
  isActive(path: string) {
    return this.router.url == path;
  }
  logout() {
    this._us.logout();
  }
}
