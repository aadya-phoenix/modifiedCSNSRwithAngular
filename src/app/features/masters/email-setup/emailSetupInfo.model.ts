export interface EmailSetupInfo{

        EmailSetup_Id : number ;
        AccountId : number ;
        DealerId : number ;
        SMTPServer : string ;
        SMTPUsername : string ;
        SMTPPassword : string ;
        PortNumber : number ;
        EnableSSL : boolean ;
        IsActive :  boolean ;
}