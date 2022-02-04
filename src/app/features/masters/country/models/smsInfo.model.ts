export interface SmsInfo{
    SMS_Id : number ;
    SMSApi : string ;
    SMSUserVariableName : string ;
    SMSUsername : string ;
    SMSPassVariable : string ;
    SMSPassword : string ;
    SMSTypeVariable : string ;
    SMSTypeValue : string ;
    SMSSenderVariable : string ;
    SMSSenderValue : string ;
    SMSMobileVariable : string ;
    SMSTextVariable : string ;
    Country_Id : number ;
    SMSTemplate : string ;
    IsActive : boolean ;
    CreatedBy ?: number ;
    CreationDate ?: Date ;
    ModifiedBy ?: number ;
    ModifiedDate ?: Date ;
    AccountId ?: number ;
    DealerId ?: number ;
}