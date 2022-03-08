import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { LogoComponent } from '@app/views/layout/logo/logo.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { QuestionProgressComponent } from './components/question-progress/question-progress.component';

@NgModule({
  declarations: [
    LogoComponent,
    QuestionCardComponent,
    QuestionProgressComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    LogoComponent,
    QuestionCardComponent,
    QuestionProgressComponent,
  ],
})
export class SharedModule {}
