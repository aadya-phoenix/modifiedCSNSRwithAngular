import { Answer } from "../../../../models/answer.model";
import { Question } from "../../models/question.model";

export interface QuestionAnswerInfo{
   Question : Question;
   Answer : Answer[];
}