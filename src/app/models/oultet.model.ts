import { LevelInfo } from "./levelInfo.model";

export interface Outlet{
    
       Outlet_Id: number;
       OutletCode: string;
       OutletName: string;
       OutletType_Id: number;
       OutletType: string;
       Dealer_Id: number;
       DealerName: string;
       OutletAddress: string;
       State_Id : number;
       StateName: string;
       City_Id: number;
       CityName: string;
       IsActive: boolean;
       CreationDate?: Date;
       CreatedBy: number;
       OutletContactPerson: string;
       OutletEmail: string;
       OutletContactNumber: string;
       Longitude: number;
       Lattitude: number;
       IsGeoFencingAllowed?: boolean;
       ProximityDistance ?:number;
       LevelInfo?:LevelInfo[];
       ModifiedDate?: Date;
       ModifiedBy?: number

  
}