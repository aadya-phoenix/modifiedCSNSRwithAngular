export interface State{
     State_Id : number;
     Country_Id ?:number;
     CountryName ?: string;
     StateName : string;
     IsActive : boolean;
     CreatedBy : number;
     CreationDate ?:Date;
     ModifiedBy ?: number;
     ModifiedDate ?: Date;
}