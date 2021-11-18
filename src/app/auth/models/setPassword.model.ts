export class SetPassword{
    constructor(
        public userId:number,
        public currentPassword:string,
        public newPassword:string
        ){}
    
}