export class ServiceDueDoneInfo{
    constructor(
       public ServiceType:string,
       public Sequence?:number,
       public ServiceDone?:number,
       public ServiceDue?:number
    ){}
}