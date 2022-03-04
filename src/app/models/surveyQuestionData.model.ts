import { Answer } from "./answer.model";
import { CheckboxAnswer } from "./checkboxAnswer.model";
import { OptionsArray } from "./optionsArray.model";
import { QuestionLanguage } from "./questionLanguage.model";
import { RangeDetail } from "./rangeDetail.model";

export interface SurveyQuestionData{
      Question ?: string ;
      QuestionType ?: number ;
      Question_Id ?: number ;
      QuestionTypeName ?: string ;
      CheckOptionArray ?: OptionsArray[] ;
      MultiSelectOptionArray ?: OptionsArray[] ;
      RadioButtonOptionArray ?: OptionsArray[] ;
      RangeDetail ?: RangeDetail ;
      SelectOptionArray ?: OptionsArray[] ;
      IsActive ?: boolean ;
      LanguageOption  ?: QuestionLanguage ;
      QuestionTypeOptions ?: Answer[] ;
      DisplayOrder ?: number ;
      Weightage ?: number ;
      QuestionOption ?:string ;
      RemarksForAns?:any;

      CheckboxAnswer?:CheckboxAnswer[];
      MultiSelectAnswer?:string[];
      YesNoAnswere?:any;
      SelectAnswer?:string;
      RadioButtonAnswer?:string;
      RangeAnswere?:any;
      TextBoxAnswere?:string;
}