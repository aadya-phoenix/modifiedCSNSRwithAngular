import { SurveyQuestionData } from "./surveyQuestionData.model";

export interface QuestionArray{
    Id ?: number ;
    QuestionCategory : string ;
    IsActive ?: boolean ;
    Data :SurveyQuestionData [] ;
}