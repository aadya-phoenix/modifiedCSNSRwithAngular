export interface Country{

      Country_Id: number;
      CountryName: string;
      Language_Id: number;
      Company_Id: number;
      IsActive: boolean;
      CreationDate?:Date;
      CreatedBy: number;
      ModifiedDate?:Date;
      ModifiedBy?: number;
      Language: string;
}