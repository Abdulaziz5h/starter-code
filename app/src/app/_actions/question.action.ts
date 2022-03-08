import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from 'src/_DATA.js';

export const fetchQuestions = () => {
  return _getQuestions();
};
export const saveQuestion = (question: {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}) => {
  return _saveQuestion(question);
};
export const saveQuestionAnswer = () => {
  return _saveQuestionAnswer();
};
