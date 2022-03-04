export interface CustomerUploadInfo{
     Customer_Id : number ;
     Outlet_Id ?: number ;
     CustomerName : string ;
     CustomerEmail : string ;
     CustomerMobile : string ;
     RegistrationNumber : string ;
     VINNumber : string ;
     Vehicle_Id ?: number ;
     VehicleSaleDate ?: Date ;
     IsActive : boolean ;
     CreatedBy : number ;
     CreationDate ?: Date ;
     ModifiedBy ?: number ;
     ModifiedDate ?: Date ;
     OutletName : string ;
     VehicleName : string ;
     SurveySentDate ?: Date ;
     SurveySentOnMail ?: boolean ;
     SurveySentOnMobile ?: boolean ;
     CustomerDetail_Id : number ;
     BillDate ?: Date ;
     JobCardNumber : string ;
     Mileage ?: number ;
     Survey_Id : number ;
     InvoiceDate ?: Date ;
}