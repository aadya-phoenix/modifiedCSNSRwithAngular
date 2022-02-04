import { LevelDetailInfo } from "./levelDetailInfo.model";

export interface LevelInfo{

    Level_Id :number ;
    LevelName :string;
    Country_Id ?:number;
    Sequence ?:number;
    IsActive ?:boolean;
    CreatedBy ?:number;
    CreationDate ?:Date;
    ModifiedBy ?:number;
    ModificationDate ?:Date;
    leveldetailInfo : LevelDetailInfo[] ;
    Leveldetail_Id :number;
    Dealer_detail_Id :number;
    Dealer_Id :number;
    Tsmdetail_Id :number ;
}