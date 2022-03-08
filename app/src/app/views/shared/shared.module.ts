import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { LogoComponent } from '@app/views/layout/logo/logo.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';

@NgModule({
  declarations: [LogoComponent, QuestionCardComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CommonModule, LogoComponent, QuestionCardComponent],
})
export class SharedModule {}
