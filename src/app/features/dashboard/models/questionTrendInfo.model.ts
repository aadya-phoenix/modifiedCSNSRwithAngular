import { QuestionTrendDtl } from "./questionTrendDtl.model";

export interface QuestionTrendInfo{
     QuestionId : number ;
     Question : string ;   
     Info : QuestionTrendDtl[] ;
}