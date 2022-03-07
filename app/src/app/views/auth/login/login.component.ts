import { IUser } from '@app/_models/IUser';
import { UserService } from '@app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: Array<IUser> = [];
  loginForm: FormGroup = new FormGroup({
    user: new FormControl(null, Validators.required),
  });
  constructor(private _us: UserService) {}
  ngOnInit() {
    this._us.fetchUsers().then((data) => {
      this.users = <IUser[]>data;
    });
  }
  get user() {
    return this.loginForm.controls['user']
  }
  login(v: any) {
    this._us.login(v.user)
  }
}
