import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LeaderboardComponent } from './leaderboard.component';
import { BoardCardComponent } from './board-card/board-card.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LeaderboardComponent,
      },
    ]),
  ],
})
export class LeaderboardRoutingModule {}
export const components = [BoardCardComponent, LeaderboardComponent]
