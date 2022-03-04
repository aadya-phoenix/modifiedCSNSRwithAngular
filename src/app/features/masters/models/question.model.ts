export interface Question{
    Question_Id : number ;
    Question : string ;
    QuestionType : number ;
    Mode : number ;
    TypeName : string ;
    IsActive : boolean ;
    CreatedBy : number ;
    CreationDate ?: Date ;
    ModifiedBy ?: number ;
    ModifiedDate ?: Date ;
}