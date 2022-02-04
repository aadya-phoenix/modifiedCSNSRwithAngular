export interface Distributor{
    Distributor_Id : number ;
    DistributorCode : string ;
    DistributorName : string ;
    DistributorAddress : string ;
    State_Id : number ;
    StateName : string ;
    City_Id : number ;
    CityName : string ;
    Country_Id : number ;
    CountryName : string ;
    Company_Id : number ;
    IsActive : boolean ;
    CreationDate ?: Date ;
    CreatedBy :  number;
    ModifiedDate ?: Date;
    ModifiedBy ?: number ;
    ContactPerson : string ;
    Email : string ;
    ContactNumber : string ;
}