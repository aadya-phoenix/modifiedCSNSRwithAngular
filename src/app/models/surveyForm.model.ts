import { QuestionArray } from "./questionArray.model";

export interface SurveyForm{
     Id ?: number ;
     SurveyDescription : string ;
     SurveyTitle : string ;
     SurveyType_Id ?: number ;
     Country_Id ?: number ;
     CountryName ?: string ;
     Language_Id ?: number ;
     User_Id : number ;
     CreatedDate ?: Date ;
     QuestionArray : QuestionArray[] ;
     SurveyThankyouText : string ;
     SurveyThankyouLanguage : string ;
     Account_Id?:number;
     DealerId?:number
}