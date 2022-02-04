export class Level{
              
      public Level_Id: number; 
      public LevelName: string;
      public Country_Id: number;
      public Sequence: string;
      public IsActive: boolean;
      public CreatedBy?: number; 
      public CreationDate?: Date;
      public ModifiedBy?: number; 
      public ModifiedDate?: Date;

    constructor(){

        this.Country_Id = 0;       
        this.Level_Id = 0;
        this.LevelName = '';
        this.Sequence = '';
        this.IsActive = false;
        
    }
}