import { AnswerType } from '@app/_enum/answerType.enum';
export interface IUser {
  id: string;
  name: string;
  avatarURL: string;
  answers: { [key: string]: AnswerType };
  questions: Array<string>;
}
