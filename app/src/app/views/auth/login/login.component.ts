import { getAllUsers } from '@app/store/users/actions';
import { getUsers } from '@app/store/users/selectors';
import { AppState } from '@app/store/app.state';
import { Observable } from 'rxjs';
import { IUser } from '@app/_models/IUser.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginStart } from '@app/store/auth/actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users$?: Observable<IUser[]>;
  loginForm: FormGroup = new FormGroup({
    userId: new FormControl(null, Validators.required),
  });
  constructor(private store: Store<AppState>) {
    this.store.dispatch(getAllUsers());
  }
  ngOnInit() {
    this.users$ = this.store.select(getUsers);
  }
  get user() {
    return this.loginForm.controls['userId'];
  }
  login(v: any) {
    this.store.dispatch(loginStart({ id: v.userId }));
  }
  trackById(i: number, u: IUser) {
    return u.id;
  }
}
