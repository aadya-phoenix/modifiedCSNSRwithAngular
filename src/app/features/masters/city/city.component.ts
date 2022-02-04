import { Component, OnInit } from '@angular/core';
import { City } from '../models/city.model';
import { State } from '../models/state.model';
import { CityService } from './city.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CityUploadComponent } from './city-upload/city-upload.component';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;
  searchText:string='';

  stateObj: State[]=[];
  cityObj:City[]=[];
  city!: City;

  session= this.constant.takeSession();

  constructor(
    private cityService:CityService,
    private masterService:MastersApiService,
    private constant:ConstantsService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
     this.showSearchGrid = true;
     this.showForm = false;
     this.showEditForm = false;
     this.getFormDetails();
  }

  getFormDetails(){
    this.masterService.getStateAll().subscribe((data:any)=>{
        this.stateObj = data;
    },error=>{
        console.log(error);
    });

    this.cityService.getCityAll().subscribe((data:any)=>{
        this.cityObj = data;
      },error=>{
        console.log(error);
    });

  }

  addCity(){
    this.city = {
      State_Id: 0,
      StateName: '',
      City_Id: 0,
      CityName:'',
      IsActive: true,
      CreatedBy: this.session.User_Id,
  }
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
    if (this.city.CityName == null || this.city.CityName == '') {
      Swal.fire('error', 'Please enter city name', 'error');
      return false;

  }          
  if (this.city.State_Id == null || this.city.State_Id == 0) {
      Swal.fire('error', 'Please enter state', 'error');
      return false;
  }
  this.cityService.addCity(this.city).subscribe((data:any)=>{
    Swal.fire('Success',data,'success');
      this.init();
     },error=>{
      console.log(error);
     });
     }
    });
  }

  init(){
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }
  addUpload(){
    this.dialog.open(CityUploadComponent,{
      disableClose: true,
      panelClass: 'custom-dialog-container',
      width:'550px',
      height:'265px'
    });
  }

  editTransaction(city:City){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true;
   
    this.city = city;
  }

  deleteTransaction(city:City){
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
    city.ModifiedBy = this.session.User_Id;

    this.cityService.deleteCity(city).subscribe((data:any)=>{
      Swal.fire("success", data, "success");
      this.init();
    },err=>{
      console.log(err);
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
  }).then((re):any=>{
    if(re.isConfirmed){

    if (this.city.CityName == null || this.city.CityName == '') {
      Swal.fire('error', 'Please enter city name', 'error');
      return false;
   }          
  if (this.city.State_Id == null || this.city.State_Id == 0) {
      Swal.fire('error', 'Please enter state', 'error');
      return false;
  }
  this.city.ModifiedBy = this.session.User_Id;
  this.cityService.addCity(this.city).subscribe((data:any)=>{
    Swal.fire('Success',data,'success');
      this.init();
     },error=>{
      console.log(error);
     });

     }
   });
  }
}
