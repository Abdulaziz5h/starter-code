import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  LeaderboardRoutingModule,
  components,
} from './leaderboard-routing.module';

@NgModule({
  declarations: [...components],
  imports: [
    LeaderboardRoutingModule,
    CommonModule,
  ],
  exports: [components[0]],
})
export class LeaderboardModule {}
