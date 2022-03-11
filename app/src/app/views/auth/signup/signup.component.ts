import { IUser } from '@app/_models/IUser.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { signup } from '@app/store/users/actions';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    avatar: new FormControl('', [Validators.required]),
  });
  constructor(private store: Store<AppState>) {}
  get name() {
    return this.signupForm.controls['name'];
  }
  get avatar() {
    return this.signupForm.controls['avatar'];
  }
  ngOnInit() {}
  signup(v: { name: string; avatar: string }) {
    this.store.dispatch(signup({ name: v.name, avatarURL: v.avatar }));
  }
}
