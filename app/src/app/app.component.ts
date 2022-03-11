import { autoLogin } from './store/auth/actions';
import { resetAlert } from './store/shared/action';
import { alertSelector } from './store/shared/selector';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { AppState } from './store/app.state';
import { IAlert } from './_models/IAlert.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  alert: IAlert = <IAlert>{};
  constructor(private store: Store<AppState>) {
    store.select(alertSelector).subscribe((alert) => {
      this.alert = alert;
    });
    this.store.dispatch(autoLogin())
  }
  closeAlert() {
    this.store.dispatch(resetAlert());
  }
}
