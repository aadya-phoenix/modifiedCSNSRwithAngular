import { MonthWiseDtl } from "./monthWiseDtl.model";

export class MonthWiseIns{
    constructor(
        public FeedMonth :string,
        public Dtl :MonthWiseDtl[],
    ){}
}