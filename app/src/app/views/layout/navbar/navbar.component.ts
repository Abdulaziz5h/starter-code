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
  constructor(private router: Router, private _us: UserService) {
    this._us.user.subscribe((user) => {
      this.user = user;
    });
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
