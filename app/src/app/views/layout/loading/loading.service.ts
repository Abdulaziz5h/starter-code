import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  _loadingProgress: number = 0;

  constructor() {}
  // loaded(limit: number) {
  //   let _this = this;
  //   (function render() {
  //     _this.incrementProgress();
  //     if (_this._loadingProgress <= limit) requestAnimationFrame(render);
  //   })();
  // }
  // reset() {
  //   this._loadingProgress = 0;
  //   this.loaded(35);
  // }
}
