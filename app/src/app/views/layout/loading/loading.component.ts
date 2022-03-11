import { setIsLoading } from './../../../store/shared/action';
import { loadingSelector } from './../../../store/shared/selector';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

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
  constructor(private store: Store<AppState>) {
    this.store.select(loadingSelector).subscribe((p) => {
      if (p) {
        this.store.dispatch(setIsLoading({ status: true }));
        const _this = this;
        (function render() {
          _this.progress++;
          if (_this.progress < p) requestAnimationFrame(render);
          else if (_this.progress == 100) {
            setTimeout(() => {
              _this.progress = 0;
              _this.store.dispatch(setIsLoading({ status: false }));
            }, 200)
          }
        })();
      } else {
        this.progress = 0;
        this.store.dispatch(setIsLoading({ status: false }));
      }
    });
  }
}
