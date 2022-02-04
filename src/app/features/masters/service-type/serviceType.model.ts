export interface ServiceType{
   ServiceType_Id : number ;
   ServiceType : string ;
   Country_Id ?: number ;
   CountryName : string ;
   IsActive ?: boolean ;
   CreatedBy ?: number ;
   CreationDate ?: Date ;
   ModifiedBy ?: number ;
   ModifiedDate ?: Date ;
   Mileage ?: number ;
   Vehicle_Id ?: number ;
   VehicleName : string ;
   ServiceDueforSaleDate ?: number ;
   ServiceDueforServiceDate ?: number ;
   Sequence ?: number ;
}