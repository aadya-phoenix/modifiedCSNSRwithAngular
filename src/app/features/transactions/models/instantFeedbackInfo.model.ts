import { SurveyQuestionData } from "src/app/models/surveyQuestionData.model";
import { CustomerInfo } from "./customerInfo.model";

export interface InstantFeedbackInfo{
      Customer_Id : string ;
      Survey_Id : number ;
      Src : string ;
      QuestionArray : SurveyQuestionData[] ;
      Customer : CustomerInfo ;
}