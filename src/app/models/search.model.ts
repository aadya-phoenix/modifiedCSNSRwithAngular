export class Search{
    public SerachType ?: number;
    public FromDate ?: any;
    public ToDate ?: any;
    public OutletId ?: number;
    public Country_Id ?: number;
    public VehicleType ?: number;
    public UserID ?: number;
    public SatisfactionType ?: string ;
    public VehicleId ?: number;
    public LeadCategory ?: number;
    public LeadStatus ?: number;
    public SourceType ?: number;
    public CallType ?: string;
    public BrandType ?: string;
    public Source ?: string;
    public ContactedCRE_id ?: number;
    public Level_Id ?: number;
    public Leveldetail_Id ?: number;
    public PageNo ?: number;

    constructor(){
     
    this.UserID = 0;
    this.SatisfactionType = '';
    this.VehicleId = 0;
    this.CallType = '';
    this.BrandType = '';
    this.Source = '';
    this.Level_Id = 0;
    this.Leveldetail_Id = 0;
        
    }
}