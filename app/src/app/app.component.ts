import { AlertService, IAlert } from './services/alert.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  alert: IAlert = {
    type: '',
    message: '',
    active: false
  };
  constructor(private _as: AlertService) {
    this._as._message.subscribe((m: IAlert) => {
      this.alert = m
    })
  }
  closeAlert() {
    this._as.close()
  }
}
