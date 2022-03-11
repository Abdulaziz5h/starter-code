import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  startTime() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(true);
      }, 2000);
    });
  }
}
