import { LoadingService } from './loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <div class="progress">
      <div
        class="progress-bar bg-danger"
        [style]="'width:' + progress + '%;'"
        role="progressbar"
      ></div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  progress: number = 0;
  constructor(private _ls: LoadingService) {
    this._ls._progressSubject.subscribe((n) => {
      this.progress = n;
    });
  }
}
