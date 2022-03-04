import { Language } from "../../../../models/language.model";

export interface LabelInDifferentLang{
     Id : number ;
     Language_Id : number  ;
     Label : string ;
     LanguageName : string ;
     LanguageArray?:Language[];
}