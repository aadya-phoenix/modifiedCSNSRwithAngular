import { LabelInDifferentLang } from "./labelInDifferentLang.model";

export interface LabelInfo{
     Language_Id : number ;
     Label : string ;
     LanguageName : string ;
     User_Id : number ;
     Label_Id : number ;
     LabelInDifferentLangArray : LabelInDifferentLang [];
}