import { LevelInfo } from "../../../models/levelInfo.model";

export class Dealer{

    public Dealer_Id : number;
    public DealerName :string;
    public DealerCode : string;
    public TSM ?: number;
    public IsActive ?: boolean;
    public CreatedBy ?: number ;
    public ModifiedBy ?: number;
    public LevelInfo :LevelInfo[] ;

    constructor(){

    this.Dealer_Id = 0;
    this.DealerName = '';
    this.DealerCode = '';
    this.LevelInfo =[];
    
}
}