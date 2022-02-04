import { Component, OnInit } from '@angular/core';
import { AddUploadComponent } from './add-upload/add-upload.component';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Language } from '../models/language.model';
import { CommonService } from './common.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  session = this.constant.takeSession();

  searchLanguage:string=''; 

  language!:Language;
  languageObj:Language[]=[];

  showSearchGrid :boolean = true;
  showLanguageForm:boolean = false;
  showEditForm:boolean = false;

  constructor(
    private constant:ConstantsService,
    private masters:MastersApiService,
    private lang:CommonService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
   this.showSearchGrid = true;
   this.showLanguageForm = false;
   this.showEditForm = false;
   this.getFormDetails();
  }

  getFormDetails(){
    this.masters.getLanguageList().subscribe((data:any)=>{
      this.languageObj = data;
    },err=>{
      console.log(err);
    });
  }

  addLanguage():void{
    this.showSearchGrid = false;
    this.showLanguageForm = true;
    this.showEditForm = false;
  }

  addUpload(){
   this.dialog.open(AddUploadComponent,{
    disableClose: true,
    panelClass: 'custom-dialog-container',
    width:'550px',
    height:'265px' 
   });
  }

  saveLanguageForm(){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result):any=>{
      if(result.isConfirmed){
      if (this.language.Language == null || this.language.Language == ''){
        Swal.fire('error', 'Please enter Language', 'error');
        return false;
    }
     this.masters.addLanguage(this.language).subscribe((data:any)=>{
      Swal.fire('Success', data, 'success');
      this.init();
     },err=>{
      console.log(err);
     });
    }
   });
  }

  init(){
   this.showSearchGrid = true;
   this.showLanguageForm = false;
   this.showEditForm = false;
   this.getFormDetails();
  }

  editTransaction(pt:Language){
    this.showSearchGrid = false;
    this.showLanguageForm = false;
    this.showEditForm =  true;
    this.language = pt;
  }
  deleteTransaction(language:Language){
    language.ModifiedBy = this.session.User_Id;
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result):any=>{
      if(result.isConfirmed){
      this.lang.deleteLanguage(language).subscribe((data:any)=>{
        this.init();
        Swal.fire("success", data, "success");
    }, (error)=>{
        console.log(error);
    });
   }
  });
  }

  editSaveTransaction(){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result):any=>{
      if(result.isConfirmed){
      if (this.language.Language == null || this.language.Language == ''){
        Swal.fire('error', 'Please enter Language', 'error');
        return false;
    }

     this.language.ModifiedBy = this.session.User_Id;

     this.lang.editLanguage(this.language).subscribe((data:any)=>{
      Swal.fire('Success', data, 'success');
      this.init();
     },err=>{
      console.log(err);
     });
    }
   });
  }
}
