export class Search{
    constructor(
        public FromDate:any,
        public ToDate: any,
        public VehicleType: number,
        public Country_Id: number,
        public UserId: number,
        public SatisfactionType:string,
        public OutletId: number,
        public BrandType: string
    ){}
}