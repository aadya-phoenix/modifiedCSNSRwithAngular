import { QuestionArray } from "src/app/models/questionArray.model";

export interface CallLogInfo{
      Customer_Id : number ;
      CustomerDetail_Id : number ;
      StatusCategory_Id : number ;
      CallStatus_Id : number ;
      FollowUpDate ?: Date ;
      FollowUpTime : any ;
      Remarks : string ;
      CreatedBy : number ;
      ServiceType_Id : number ;
      CallLog_Id ?: number ;
      QuestionArray : QuestionArray[] ;
      CallType : string ;
      CloseFollowUp : Boolean ;
}