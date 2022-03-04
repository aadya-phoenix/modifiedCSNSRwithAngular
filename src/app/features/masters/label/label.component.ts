import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { Language } from '../../../models/language.model';
import { EditLabelComponent } from './edit-label/edit-label.component';
import { LabelInfo } from './models/labelInfo.model';
import { LabelService } from './label.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  
  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;
  searchText:string='';

  session= this.constant.takeSession();

  labelArray:LabelInfo[]=[];
  languageList:Language[]=[];
  label!:LabelInfo;
  labelObj!:LabelInfo;

  constructor(
    private constant:ConstantsService,
    private labelService:LabelService,
    private masterService:MastersApiService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }
 
  getFormDetails(){
    this.labelService.getLabelList().subscribe((data:any)=>{
      this.labelArray = data;

      this.masterService.getLanguageList().subscribe((data:any)=>{
       this.languageList = data;
        },error=>{
         console.log(error);
       });

      },error=>{
      console.log(error);
   });
  }

  editTransaction(pt:LabelInfo){
    console.log(pt);
    this.label = pt;
    this.labelObj = pt;
     this.dialog.open(EditLabelComponent,{
      data:{label:this.labelObj,sess:this.session}, 
      disableClose: true,
    }); 
  }
}
