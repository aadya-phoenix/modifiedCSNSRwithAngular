export interface Language{
    Language_Id : number;
    Language : string ;
    IsDefault: boolean;
    IsActive: boolean ;
    CreatedBy: number;
    CreationDate ?: Date;
    ModifiedDate ?: Date;
    ModifiedBy ?: number;
}