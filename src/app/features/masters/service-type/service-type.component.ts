import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Country } from 'src/app/models/country.model';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { CommonApiService } from '../services/common-api.service';
import { Vehicle } from '../models/vehicle.model';
import { ServiceTypeService } from './service-type.service';
import { ServiceType } from './serviceType.model';
import Swal from 'sweetalert2';
import { ServiceTypeUploadComponent } from './service-type-upload/service-type-upload.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent implements OnInit {

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;

  session = this.constant.takeSession();
  Role = this.session.RoleName;
  searchText:string='';

  serviceTypeObj:ServiceType[] = [];
  countryObj:Country[] = [];
  vehicleObj:Vehicle[] = [];
  serviceType!:ServiceType;

  constructor(
    private constant:ConstantsService,
    private service:ServiceTypeService,
    private masters:MastersApiService,
    private apiService:CommonApiService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }

  getFormDetails(){
     this.service.getServiceType().subscribe((data:any)=>{
      this.serviceTypeObj = data;
     },error=>{
        console.log(error);
    });
    this.masters.getCountryList().subscribe((data:any)=>{
       this.countryObj = data;
      },error=>{
        console.log(error);
    });
    this.apiService.getVehicleList().subscribe((data:any)=>{
       this.vehicleObj = data;
      },error=>{
        console.log(error);
    });
  }

  addServiceType(){
    this.serviceType = {
      ServiceType_Id: 0,
      ServiceType: '',
      Country_Id: 0,
      CountryName :'',
      IsActive: true,
      CreatedBy: this.session.User_Id,
      ModifiedBy: 0,
      Vehicle_Id: 0,
      VehicleName :'',
      ServiceDueforSaleDate: 0,
      ServiceDueforServiceDate: 0,
      };
    this.showSearchGrid = false;
    this.showForm = true;
    this.showEditForm = false;
  }

  addUpload(){
    this.dialog.open(ServiceTypeUploadComponent,{
      disableClose: true,
      panelClass: 'custom-dialog-container',
      width:'550px',
      height:'265px'   
    });
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
     if (this.serviceType.ServiceType == null || this.serviceType.ServiceType == '') {
       Swal.fire('error', 'Please select service type', 'error');
       return false;
   }
   if (this.serviceType.Vehicle_Id == null || this.serviceType.Vehicle_Id == 0) {
       Swal.fire('error', 'Please select service type', 'error');
       return false;
   }
   if (this.serviceType.Mileage == null || this.serviceType.Mileage == 0) {
       Swal.fire('error', 'Please select Mileage', 'error');
       return false;
   }
   if (this.serviceType.ServiceDueforSaleDate == null || this.serviceType.ServiceDueforSaleDate == 0) {
       Swal.fire('error', 'Please select service due from sale date (in months)', 'error');
       return false;
   }
   if (this.serviceType.ServiceDueforServiceDate == null || this.serviceType.ServiceDueforServiceDate == 0) {
       Swal.fire('error', 'Please select service due from service date (in months)', 'error');
       return false;
   }
   if (this.serviceType.Country_Id == null || this.serviceType.Country_Id == 0) {
       Swal.fire('error', 'Please select Country', 'error');
       return false;
   }

   this.service.addServiceType(this.serviceType).subscribe((data:any)=>{
    Swal.fire('Success', data, 'success');
     this.init();
     },error=>{
     console.log(error);
     });
    }
  });
  }

  
  editTransaction(pt:ServiceType){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm =  true;
    this.serviceType = pt;
  }

  deleteTransaction(pt:ServiceType){
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
    pt.ModifiedBy = this.session.User_Id;

    this.service.deleteServiceType(pt).subscribe((data:any)=>{
     Swal.fire('Success', data, 'success');
      this.init();
      },error=>{
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
     if (this.serviceType.ServiceType == null || this.serviceType.ServiceType == '') {
       Swal.fire('error', 'Please select service type', 'error');
       return false;
   }
   if (this.serviceType.Vehicle_Id == null || this.serviceType.Vehicle_Id == 0) {
       Swal.fire('error', 'Please select service type', 'error');
       return false;
   }
   if (this.serviceType.Mileage == null || this.serviceType.Mileage == 0) {
       Swal.fire('error', 'Please select Mileage', 'error');
       return false;
   }
   if (this.serviceType.ServiceDueforSaleDate == null || this.serviceType.ServiceDueforSaleDate == 0) {
       Swal.fire('error', 'Please select service due from sale date (in months)', 'error');
       return false;
   }
   if (this.serviceType.ServiceDueforServiceDate == null || this.serviceType.ServiceDueforServiceDate == 0) {
       Swal.fire('error', 'Please select service due from service date (in months)', 'error');
       return false;
   }
   if (this.serviceType.Country_Id == null || this.serviceType.Country_Id == 0) {
       Swal.fire('error', 'Please select Country', 'error');
       return false;
   }

     this.serviceType.ModifiedBy = this.session.User_Id;

     this.service.editServiceType(this.serviceType).subscribe((data:any)=>{
      Swal.fire('Success', data, 'success');
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
}
