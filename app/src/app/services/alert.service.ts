import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IAlert {
  type: string;
  message: string;
  active?: boolean;
}

@Injectable()
export class AlertService {
  setDefMessage() {
    return {
      type: 'success',
      message: '',
      active: false,
    };
  }
  private localeMessage!: IAlert;
  _message: Subject<IAlert> = new Subject<IAlert>();
  constructor() {
    this.message = this.setDefMessage();
  }

  private set message(m: IAlert) {
    this.localeMessage = m;
    this._message.next(m);
  }

  alert(alert: IAlert) {
    if (!this.localeMessage.active) {
      this.message = {
        ...alert,
        active: true,
      };
      setTimeout(() => {
        this.close();
      }, 3000);
    }
  }
  close() {
    this.message = this.setDefMessage();
  }
}
