import { SatisfactionCountInfo } from "./satisfactionCountInfo.model";

export class CustomerSatisfactionInfo
{
    constructor(
       public Month :string ,
       public info :SatisfactionCountInfo[],
    ){}
}