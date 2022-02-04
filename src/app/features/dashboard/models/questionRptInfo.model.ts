import { QuestionRptRawInfo } from "./questionRptRawInfo.model";

export class QuestionRptInfo{
    constructor(
        public QuestionIndex :string,
        public QuestionId :number ,
        public QuestionType :number ,
        public Question :string ,
        public TranslatedQuestion :string ,
        public QuestionComplete :string ,
        public Sum :number ,
        public WeightedSum :number ,
        public Avg :number ,
        public Info :QuestionRptRawInfo[] ,
    ){}
}