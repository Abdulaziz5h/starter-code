import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuestionsTabComponent } from './questions-tab/questions-tab.component';

@NgModule({
  declarations: [HomeComponent, QuestionsTabComponent],
  imports: [HomeRoutingModule, SharedModule, RouterModule],
})
export class HomeModule {}
