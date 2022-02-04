import { Component, OnInit } from '@angular/core';
import { State } from '../models/state.model';
import { Country } from 'src/app/models/country.model';
import { StateService } from './state.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { StateUploadComponent } from './state-upload/state-upload.component';
import { MastersApiService } from 'src/app/services/masters-api.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor(
    private stateService:StateService,
    private masterService:MastersApiService,
    private constantService:ConstantsService,
    public dialog:MatDialog
  ) { }

  session= this.constantService.takeSession();
  showSearchGrid:boolean =true;
  showForm:boolean  = false;
  showEditForm:boolean = false;
  searchText:string='';

  stateObj: State[]=[];
  countryObj:Country[]=[];
  state!: State;
  
  ngOnInit(): void {
    this.getFormDetails();
  }

  getFormDetails(){
    this.masterService.getStateAll().subscribe((data:any)=>{
      this.stateObj = data;
  }, err=>{
      console.log(err);
  });
  this.stateService.getCountryList().subscribe((data:any)=>{
      this.countryObj = data;
  }, err=>{
      console.log(err);
  });
  }

  addState(){
    this.state = {
      State_Id: 0,
      StateName: '',
      Country_Id: 0,
      IsActive: true,
      CreatedBy: this.session.User_Id,
  };
  this.showSearchGrid = false;
  this.showForm = true;
  this.showEditForm = false;
  }

  saveForm(){
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
    if (this.state.StateName == null || this.state.StateName == '') {
      Swal.fire('error', 'Please enter State name', 'error');
      return false;

  }          
  if (this.state.Country_Id == null || this.state.Country_Id == 0) {
      Swal.fire('error', 'Please enter country', 'error');
      return false;
  }
  this.stateService.addState(this.state).subscribe((data:any)=>{
  Swal.fire('Success',data, 'success');
    this.init();
   },error=>{
    console.log(error);
   });
   }
  });
  }

  editTransaction(state:State){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true;

    this.state = state;
  }

  deleteTransaction(state:State){
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
    state.ModifiedBy = this.session.User_Id;

    this.stateService.deleteState(state).subscribe((data:any)=>{
      Swal.fire("success", data, "success");
      this.init();
    },err=>{
      console.log(err);
    });
   }
  });
  }

  addUpload(){
   this.dialog.open(StateUploadComponent,{
    disableClose: true,
    panelClass: 'custom-dialog-container',
    width:'550px',
    height:'265px'
   })
  }

  init(){
    this.showSearchGrid =true;
    this.showForm  = false;
    this.showEditForm = false;
    this.getFormDetails();
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
    if (this.state.StateName == null || this.state.StateName == '') {
      Swal.fire('error', 'Please enter State name', 'error');
      return false;

  }          
  if (this.state.Country_Id == null || this.state.Country_Id == 0) {
      Swal.fire('error', 'Please enter country', 'error');
      return false;
  }

  this.state.ModifiedBy = this.session.User_Id;
  this.stateService.editState(this.state).subscribe((data:any)=>{
    Swal.fire("success", data, "success");
    this.init();
  },err=>{
    console.log(err);
  });
  }
  });
  }
}
