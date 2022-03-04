export interface AutomatedSurveyInfo{
         Survey_Id : number ;
         SurveyTitle : string ;
         SurveyDescription : string ;
         SurveyType_Id ?: number ;
         SurveyType : string ;
         Country_Id ?: number ;
         Country : string ;
         Language_Id ?: number ;
         Language : string ;
         SurveyCategory_Id ?: number ;
         Category : string ;
         IsActive ?: boolean ;
         Task_Id ?: number ;
         FirstTriggerFrequency ?: number ;
         SubsequentTriggerFrequency ?: number ;
         SurveyCount ?: number ;
         Status ?: number ;

}