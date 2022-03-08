import { IUser } from '@app/_models/IUser';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() user!: IUser;
  @Input() order: number = 0;
  colors: { [key: number]: string } = {
    1: 'gold',
    2: 'silver',
    3: 'bronze',
  };
  constructor() {}

  getAnswersCount(user: IUser) {
    return Object.keys(user.answers).length + user.questions.length;
  }
  getAnsweredQuestionsCount(user: IUser) {
    return Object.keys(user.answers).length;
  }
  getOrderClass(order: number) {
    return this.colors[order] ? this.colors[order] : '';
  }
}
