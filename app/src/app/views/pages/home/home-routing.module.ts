import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'questions/:id',
        component: QuestionComponent
      }
    ]),
  ],
})
export class HomeRoutingModule {}
export const components = [HomeComponent, QuestionComponent]
