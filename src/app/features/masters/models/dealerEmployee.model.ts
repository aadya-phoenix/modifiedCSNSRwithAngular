export interface DealerEmployee{
  
   Employee_Id : number;
   ActivationSource : string ;
   Country_id : number;
   Country : string;
   DealerOutlet_Id : number;
   OutletName : string;
   FirstName : string;
   LastName : string;
   EmpCode : string ;
   Email  : string ;      
   MobileNumber : string;
   Designation_Id : number;
   Designation : string  ;
   ReportingPerson_Id ?: number;
   ReportingPerson : string ;
   IsActive :boolean ;
   CreatedBy : number ;
   CreationDate ?: Date ;
   ModifiedBy?: number ;
   ModifiedDate ?: Date;
   MobileLoginDate ?: Date ;
   WebLoginDate ?: Date ;

}