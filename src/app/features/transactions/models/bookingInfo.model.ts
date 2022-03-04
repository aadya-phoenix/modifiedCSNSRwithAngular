export interface BookingInfo{
      OutletId : number ; 
      Customer_Id ?: number ;
      CustomerName : string ;
      CustomerEmail : string ;
      CustomerMobile2 : string ;
      CustomerMobile : string ;
      VINNumber : string ;
      RegistrationNumber : string ;
      Vehicle_Id : number ;
      ServiceType_Id : number ;
      BookingDate ?: Date ;
      BookingTime ?: any ;
      Remarks : string ;
      Mileage ?: number ;
      UserId : number ;
      InvoiceDate ?: any;
}