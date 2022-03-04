import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MastersApiService } from 'src/app/services/masters-api.service';
import Swal from 'sweetalert2';
import { Language } from '../../../../models/language.model';
import { LabelService } from '../label.service';
import { LabelInfo } from '../models/labelInfo.model';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.css']
})
export class EditLabelComponent implements OnInit {

  labelObj!:LabelInfo;
  languageList:Language[]=[]
  languageArray:Language[]=[];

  session:any;

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
   private masterService:MastersApiService,
   private labelService:LabelService ) { }

  ngOnInit(): void {
   this.labelObj = this.data.label;
   this.session= this.data.sess;

   this.masterService.getLanguageList().subscribe((data:any)=>{
    this.languageList = data;

    for(let pt of this.labelObj.LabelInDifferentLangArray){
      pt.LanguageArray = this.languageList;
      }
     },error=>{
      console.log(error);
    });
  }

  addNewLanguage(){
   this.labelObj.LabelInDifferentLangArray.push({
      Id:0,
      Label: '',
      Language_Id: 0,
      LanguageName:'',
      LanguageArray: this.languageList
   });
  }

  removeDiffLanguage(i:number){
    this.labelObj.LabelInDifferentLangArray.splice(i ,1);
  }

  updateLabel():any{
    var keepgoin = true;
    if (!this.labelObj.Label) {
        Swal.fire("Error", "Label can not be empty", "error");
        return false;
    }
    if (!this.labelObj.Language_Id) {
        Swal.fire("Error", "Language can not be empty", "error");
        return false;
    }

     for(let value of this.labelObj.LabelInDifferentLangArray){
        if (!value.Label) {
            keepgoin = false;
            Swal.fire("Error", "Label can not be empty", "error");
            return false;
        }
        else if (!value.Language_Id) {
            keepgoin = false;
            Swal.fire("Error", "Language can not be empty", "error");
            return false;
        }
    }
    if (keepgoin == true) {
        this.labelObj.User_Id = this.session.User_Id;
        console.log(this.labelObj);
        this.labelService.updateLabel(this.labelObj).subscribe((data:any)=>{
            if (data.indexOf('success') != -1) {
                Swal.fire("Success", "successfully saved", "success");
            }
            else {
                Swal.fire("Error", "can not be saved", "error");
            }
            this.cancel();
            this.init();
          },  (error)=>{
            console.log(error);
        });
    }
  }

  cancel(){}
  init(){}
}
