import { Answer } from "./answer.model";
import { Question } from "./question.model";

export interface QuestionAnswerInfo{
   Question : Question;
   Answer : Answer[];
}