import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LeadershipComponent } from './leaderboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LeadershipComponent,
      },
    ]),
  ],
})
export class LeaderboardRoutingModule {}
