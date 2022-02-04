export interface Vehicle{
    Vehicle_Id : number ;
    VehicleCode : string ;
    VehicleName : string ;
    Country_Id ?: number ;
    VehicleType_Id ?: number ;
    IsActive : boolean ;
    CreatedBy : number ;
    CreationDate ?: Date ;
    ModifiedBy ?: number ;
    ModifiedDate ?: Date ;
    CountryName : string ;
    VehicleType : string ;
    Brand_Id : number ;
    BrandName : string ;
    BrandTag : string ;
}