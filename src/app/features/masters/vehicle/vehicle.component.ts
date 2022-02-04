import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Country } from 'src/app/models/country.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { CommonApiService } from '../services/common-api.service';
import { Vehicle } from '../models/vehicle.model';
import { VehicleService } from './vehicle.service';
import Swal from 'sweetalert2';
import { VehicleUploadComponent } from './vehicle-upload/vehicle-upload.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;

  session = this.constant.takeSession();
  Role = this.session.RoleName;
  searchText:string='';

  vehicleObj:Vehicle[] = [];
  countryObj:Country[] = [];
  vehicleTypeObj:VehicleType[] = [];
  vehicleBrandObj:any;
  vehicle!:Vehicle;
  

  constructor(
    private apiService:CommonApiService,
    private constant:ConstantsService,
    private vehicleService:VehicleService,
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
    this.apiService.getVehicleList().subscribe((data:any)=>{
     this.vehicleObj = data;
    },error=>{
      console.log(error);
  });

    this.masterService.getCountryList().subscribe((data:any)=>{
       this.countryObj = data;
      },error=>{
        console.log(error);
    });

    this.vehicleService.getVehicleTypeList().subscribe((data:any)=>{
      this.vehicleTypeObj = data;
      },error=>{
        console.log(error);
    });
  
    this.vehicleService.getVehicleBrandList().subscribe((data:any)=>{
     this.vehicleBrandObj = data;
      },error=>{
        console.log(error);
     });
  }

  addVehicle(){
    this.vehicle = {
     Vehicle_Id: 0,
     VehicleCode: '',
     VehicleName: '', 
     Country_Id: 0,
     VehicleType_Id:0,
     IsActive: true,
     CreatedBy: this.session.User_Id,
     ModifiedBy: 0,
     CountryName : '' ,
     VehicleType : '' ,
     Brand_Id: 0,
     BrandName : '',
     BrandTag : '' 
  };
   this.showSearchGrid = false;
   this.showForm = true;
   this.showEditForm = false;
  }

  addUpload(){
    this.dialog.open(VehicleUploadComponent,{
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
    if (this.vehicle.VehicleCode == null || this.vehicle.VehicleCode == '') {
        Swal.fire('error', 'Please select Vehicle Code ', 'error');
        return false;
    }
    if (this.vehicle.VehicleName == null || this.vehicle.VehicleName == '') {
        Swal.fire('error', 'Please enter Vehicle name', 'error');
        return false;
    }
    if (this.vehicle.Country_Id == null || this.vehicle.Country_Id == 0) {
        Swal.fire('error', 'Please enter Country', 'error');
        return false;
    }
    if (this.vehicle.VehicleType_Id == null || this.vehicle.VehicleType_Id == 0) {
        Swal.fire('error', 'Please enter Vehicle Type', 'error');
        return false;
    }
    if (this.vehicle.Brand_Id == null || this.vehicle.Brand_Id == 0) {
       Swal.fire('error', 'Please enter Brand', 'error');
       return false;
    }

    this.vehicleService.addVehicle(this.vehicle).subscribe((data:any)=>{
      Swal.fire('Success', data, 'success');
       this.vehicleInit();
       },error=>{
       console.log(error);
       });
      }
  });
  }

  editTransaction(pt:Vehicle){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm =  true;
    this.vehicle = pt;
  }

  deleteTransaction(pt:Vehicle){
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

    this.vehicleService.deleteVehicle(pt).subscribe((data:any)=>{
     Swal.fire('Success', data, 'success');
      this.vehicleInit();
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
    if (this.vehicle.VehicleCode == null || this.vehicle.VehicleCode == '') {
        Swal.fire('error', 'Please select Vehicle Code ', 'error');
        return false;
    }
    if (this.vehicle.VehicleName == null || this.vehicle.VehicleName == '') {
        Swal.fire('error', 'Please enter Vehicle name', 'error');
        return false;
    }
    if (this.vehicle.Country_Id == null || this.vehicle.Country_Id == 0) {
        Swal.fire('error', 'Please enter Country', 'error');
        return false;
    }
    if (this.vehicle.VehicleType_Id == null || this.vehicle.VehicleType_Id == 0) {
        Swal.fire('error', 'Please enter Vehicle Type', 'error');
        return false;
    }
    if (this.vehicle.Brand_Id == null || this.vehicle.Brand_Id == 0) {
       Swal.fire('error', 'Please enter Brand', 'error');
       return false;
    }

    this.vehicle.ModifiedBy = this.session.User_Id;

    this.vehicleService.editVehicle(this.vehicle).subscribe((data:any)=>{
      Swal.fire('Success', data, 'success');
       this.vehicleInit();
       },error=>{
       console.log(error);
       });
      }
  });
  }

  vehicleInit(){
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }
}
