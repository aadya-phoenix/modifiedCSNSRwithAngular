export interface Company{
    Company_Id : number;
    CompanyName : string ;
    CompanyLogo : string ;
    UrlPath : string ;
    IsActive : boolean ;
    CreatedBy : number;
    CreationDate ?: Date ;
    ModifiedDate ?: Date ;
    ModifiedBy ?: number;
}