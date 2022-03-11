import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { HomeRoutingModule, components } from './home-routing.module';
import { QuestionsTabComponent } from './questions-tab/questions-tab.component';

@NgModule({
  declarations: [QuestionsTabComponent, ...components],
  imports: [
    HomeRoutingModule,
    SharedModule,
    RouterModule,
  ],
})
export class HomeModule {}
