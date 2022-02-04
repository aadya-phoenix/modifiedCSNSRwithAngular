export interface City{
   City_Id :number;
   State_Id :number;
   StateName :string;
   CityName :string;
   IsActive :boolean;
   CreatedBy :number;
   CreationDate ?:Date;
   ModifiedBy ?:number;
   ModifiedDate ?:Date;
}