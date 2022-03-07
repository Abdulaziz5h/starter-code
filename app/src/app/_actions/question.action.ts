import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "src/_DATA.js";

export const fetchQuestions = () => {
  return _getQuestions();
};
export const saveQuestion = () => {
  return _saveQuestion();
};
export const saveQuestionAnswer = () => {
  return _saveQuestionAnswer();
};
