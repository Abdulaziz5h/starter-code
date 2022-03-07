import { IAnswer } from './IAnswer';
import { AnswerType } from '@app/_enum/answerType.enum';
export interface IQuestion {
    id: string,
    author: string,
    timestamp: number,
    [AnswerType.optionOne]: IAnswer,
    [AnswerType.optionTwo]: IAnswer,
}
