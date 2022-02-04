import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { Country } from '../../../models/country.model';
import { City } from '../models/city.model';
import { State } from '../models/state.model';
import { DistributorService } from './distributor.service';
import { Distributor } from '../models/distributor.model';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from '../services/common-api.service';
import { DistributorUploadComponent } from './distributor-upload/distributor-upload.component';

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;

  distributorObj:Distributor[] = [];
  countryObj:Country[] = [];
  distributor!:Distributor;
  stateObj:State[]= [];
  cityObj:City[]= [];
  session = this.constant.takeSession();
  searchText:string = '';

  constructor(
    private distService: DistributorService,
    private master:MastersApiService,
    private constant:ConstantsService,
    private commonService:CommonApiService,
    public dialog:MatDialog
    
  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }

  getFormDetails(){
    this.commonService.getDistributorList().subscribe((data:any)=>{
      this.distributorObj = data;
    }, error => {
      console.log(error);
    });

    this.master.getCountryList().subscribe((data:any)=>{
      this.countryObj = data;
    }, error => {
      console.log(error);
    });

  }

  addDistributor(){
    this.distributor = {
      Distributor_Id: 0,
      DistributorCode: '',
      DistributorName: '',
      DistributorAddress: '',
      State_Id: 0,
      StateName: '',
      City_Id: 0,
      CityName : '',
      Country_Id: 0,
      CountryName : '',
      Company_Id: 1,
      IsActive: true,
      CreatedBy: this.session.User_Id,
      ContactPerson: '',
      Email: '',
      ContactNumber: ''
  }

  this.showSearchGrid = false;
  this.showForm = true;
  this.showEditForm = false;
  }

  addUpload(){
    this.dialog.open(DistributorUploadComponent,{
      disableClose: true,
      panelClass: 'custom-dialog-container',
      width:'550px',
      height:'265px'
    });
  }

  getState(id:number){
    this.commonService.getState(id).subscribe((data:any)=>{
      this.stateObj = data;
    }, error => {
      console.log(error);
    });
  }

  getCity(id:number){
    this.commonService.getCity(id).subscribe((data:any)=>{
      this.cityObj = data;
      console.log("city obj is",this.cityObj);
    }, error => {
      console.log(error);
    });
  }

  saveForm(){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue" ,
      allowOutsideClick:false
  }).then((result):any=>{
    if(result.isConfirmed){
    if (this.distributor.DistributorName == null || this.distributor.DistributorName == '') {
      Swal.fire('error', 'Please enter Distributor name', 'error');
      return false;

  }          
  if (this.distributor.DistributorCode == null || this.distributor.DistributorCode == '') {
      Swal.fire('error', 'Please enter Distributor Code', 'error');
      return false;
  }
  if (this.distributor.DistributorAddress == null || this.distributor.DistributorAddress == '') {
    Swal.fire('error', 'Please enter Distributor address', 'error');
    return false;

  }
  if (this.distributor.Country_Id == null || this.distributor.Country_Id == 0) {
      Swal.fire('error', 'Please enter country', 'error');
      return false;
  
  }
  if (this.distributor.ContactPerson == null || this.distributor.ContactPerson == '') {
      Swal.fire('error', 'Please enter Distributor contact person', 'error');
      return false;
  
  }
  if (this.distributor.Email == null || this.distributor.Email == '') {
      Swal.fire('error', 'Please enter Distributor email', 'error');
      return false;
  
  }
  if (this.distributor.ContactNumber == null || this.distributor.ContactNumber == '') {
      Swal.fire('error', 'Please enter Distributor contact number', 'error');
      return false;
  
  }
  this.distService.addDistributor(this.distributor).subscribe((data:any)=>{
    Swal.fire('Success', 'Survey form Saved successfully', 'success');
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

  editTransaction(pt:Distributor){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true;
    this.distributor = pt;
    this.getState(this.distributor.Country_Id);
    this.getCity(this.distributor.State_Id);
  }

  deleteTransaction(pt:Distributor){
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting Distrubtor will cause Dealer to get deleted. Are you Sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
  }).then((result):any=>{
    if(result.isConfirmed){
    pt.ModifiedBy = this.session.User_Id;

    this.distService.deleteDistributor(pt).subscribe((data:any)=>{
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
      confirmButtonText: "Continue" ,
      allowOutsideClick:false
  }).then((result):any=>{
    if(result.isConfirmed){
    if (this.distributor.DistributorName == null || this.distributor.DistributorName == '') {
      Swal.fire('error', 'Please enter Distributor name', 'error');
      return false;

  }          
  if (this.distributor.DistributorCode == null || this.distributor.DistributorCode == '') {
      Swal.fire('error', 'Please enter Distributor Code', 'error');
      return false;
  }
  if (this.distributor.DistributorAddress == null || this.distributor.DistributorAddress == '') {
    Swal.fire('error', 'Please enter Distributor address', 'error');
    return false;

  }
  if (this.distributor.Country_Id == null || this.distributor.Country_Id == 0) {
      Swal.fire('error', 'Please enter country', 'error');
      return false;
  
  }
  if (this.distributor.ContactPerson == null || this.distributor.ContactPerson == '') {
      Swal.fire('error', 'Please enter Distributor contact person', 'error');
      return false;
  
  }
  if (this.distributor.Email == null || this.distributor.Email == '') {
      Swal.fire('error', 'Please enter Distributor email', 'error');
      return false;
  
  }
  if (this.distributor.ContactNumber == null || this.distributor.ContactNumber == '') {
      Swal.fire('error', 'Please enter Distributor contact number', 'error');
      return false;
  
  }
this.distributor.ModifiedBy = this.session.User_Id;

this.distService.editDistributor(this.distributor).subscribe((data:any)=>{
  Swal.fire('Success', data, 'success');
    this.init();
   },error=>{
    console.log(error);
   });
  }
  });
   }
}
