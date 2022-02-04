import { Component, OnInit } from '@angular/core';
import { Outlet } from 'src/app/models/oultet.model';
import { DealerLi } from '../dealer-group/dealerLi.model';
import { OutletType } from './outletType.model';
import { CommonApiService } from '../services/common-api.service';
import { DealerOutletService } from './dealer-outlet.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { State } from '../models/state.model';
import { City } from '../models/city.model';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DealerEmployeeUploadComponent } from '../employee-master/dealer-employee-upload/dealer-employee-upload.component';


@Component({
  selector: 'app-dealer-outlet',
  templateUrl: './dealer-outlet.component.html',
  styleUrls: ['./dealer-outlet.component.css']
})
export class DealerOutletComponent implements OnInit {

   showSearchGrid :boolean = true;
   showForm :boolean = false;
   showEditForm :boolean = false;

   session = this.constant.takeSession();
   searchText:string='';

   dealerObj: DealerLi[]=[] ;
   outletObj: Outlet[]=[];
   outletTypeObj: OutletType[]=[];
   outlet!:Outlet;
   stateObj:State[]=[];
   cityObj:City[]=[];
  
  constructor(
    private outletService:DealerOutletService,
    private apiService:CommonApiService,
    private constant:ConstantsService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }

  addDealerOutlet(){
    this.outlet = {
      Outlet_Id: 0,
      OutletCode: '',
      OutletName: '',
      OutletType_Id: 0,
      OutletType:'',
      Dealer_Id: 0,
      DealerName:'',
      OutletAddress: '',
      State_Id: 0,
      StateName:'',
      City_Id: 0,
      CityName:'',
      IsActive: true,
      CreatedBy: this.session.User_Id,
      ModifiedBy: 0,
      OutletContactPerson: '',
      OutletEmail: '',
      OutletContactNumber: '',
      Longitude:0,
      Lattitude: 0,     
    };
  this.showSearchGrid = false;
  this.showForm = true;
  this.showEditForm = false;
  }

  addUpload(){
    this.dialog.open(DealerEmployeeUploadComponent,{
      disableClose: true,
      panelClass: 'custom-dialog-container',
      width:'550px',
      height:'265px'   
    })
  }
  getFormDetails(){
    this.apiService.getDealerList().subscribe((data:any)=>{
        this.dealerObj = data;
    },error=>{
        console.log(error);
    });

    this.outletService.getDealerOutletList().subscribe((data:any)=>{
      this.outletObj = data;
      },error=>{
        console.log(error);
    });

    this.outletService.getOutletTypeList().subscribe((data:any)=>{
        this.outletTypeObj = data;
      },error=>{
        console.log(error);
    });
  }

  getCountryFromDealer(id:number){
    for (let dealer of this.dealerObj) {
      if (dealer.Dealer_Id == id) {
          this.getState(dealer.Country_Id);
      }
    }
}
  getState(id:number){
    this.apiService.getState(id).subscribe((data:any)=>{
      this.stateObj = data;
    }, error => {
      console.log(error);
    });
  }
  getCity(id:number){
    this.apiService.getCity(id).subscribe((data:any)=>{
      this.cityObj = data;
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
      confirmButtonText: "Continue",
      allowOutsideClick:false 
  }).then((result):any=>{
    if(result.isConfirmed){
      if (this.outlet.Dealer_Id == null || this.outlet.Dealer_Id == 0) {
        Swal.fire('error', 'Please select dealer ', 'error');
        return false;
    }
    if (this.outlet.OutletCode == null || this.outlet.OutletCode == '') {
        Swal.fire('error', 'Please enter outlet code', 'error');
        return false;
    }
    if (this.outlet.OutletName == null || this.outlet.OutletName == '') {
        Swal.fire('error', 'Please enter outlet name', 'error');
        return false;
    }
    if (this.outlet.OutletType_Id == null || this.outlet.OutletType_Id == 0) {
        Swal.fire('error', 'Please enter outlet type', 'error');
        return false;
    }
    if (this.outlet.OutletAddress == null || this.outlet.OutletAddress == '') {
        Swal.fire('error', 'Please enter country', 'error');
        return false;
    }
    if (this.outlet.State_Id == null || this.outlet.State_Id == 0) {
        Swal.fire('error', 'Please enter state', 'error');
        return false;
    }
    if (this.outlet.City_Id == null || this.outlet.City_Id == 0) {
        Swal.fire('error', 'Please enter city', 'error');
        return false;
    }
    if (this.outlet.OutletContactPerson == null || this.outlet.OutletContactPerson == '') {
        Swal.fire('error', 'Please enter outlet contact person', 'error');
        return false;
    }
    if (this.outlet.OutletEmail == null || this.outlet.OutletEmail == '') {
        Swal.fire('error', 'Please enter outlet email', 'error');
        return false;
  }
  if (this.outlet.OutletContactNumber == null || this.outlet.OutletContactNumber == '') {
      Swal.fire('error', 'Please enter outlet contact number', 'error');
      return false;
  }

if (this.outlet.IsGeoFencingAllowed && !this.outlet.Lattitude) {
     Swal.fire('error', 'Please enter Lattitude', 'error');
     return false;
 }
 if (this.outlet.IsGeoFencingAllowed && !this.outlet.Longitude) {
     Swal.fire('error', 'Please enter Longitude', 'error');
     return false;
 }
 if (this.outlet.IsGeoFencingAllowed && !this.outlet.ProximityDistance) {
     Swal.fire('error', 'Please enter Proximity Distance', 'error');
     return false;
 }

 this.outletService.addOutlet(this.outlet).subscribe((data:any)=>{
  Swal.fire('Success', data, 'success');
   this.outletInit();
   },error=>{
   console.log(error);
   });
   }
  });
  }
  editTransaction(pt:Outlet){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm =  true;

    this.outlet = pt;
    for (let dealer of this.dealerObj) {
      if (dealer.Dealer_Id == this.outlet.Dealer_Id) {
          this.getState(dealer.Country_Id);
      }
    }
    this.getCity(this.outlet.State_Id);
  }

  deleteTransaction(pt:Outlet){
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

    this.outletService.deleteOutlet(this.outlet).subscribe((data:any)=>{
     Swal.fire('Success', data, 'success');
      this.outletInit();
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
      if (this.outlet.Dealer_Id == null || this.outlet.Dealer_Id == 0) {
        Swal.fire('error', 'Please select dealer ', 'error');
        return false;
    }
    if (this.outlet.OutletCode == null || this.outlet.OutletCode == '') {
        Swal.fire('error', 'Please enter outlet code', 'error');
        return false;
    }
    if (this.outlet.OutletName == null || this.outlet.OutletName == '') {
        Swal.fire('error', 'Please enter outlet name', 'error');
        return false;
    }
    if (this.outlet.OutletType_Id == null || this.outlet.OutletType_Id == 0) {
        Swal.fire('error', 'Please enter outlet type', 'error');
        return false;
    }
    if (this.outlet.OutletAddress == null || this.outlet.OutletAddress == '') {
        Swal.fire('error', 'Please enter country', 'error');
        return false;
    }
    if (this.outlet.State_Id == null || this.outlet.State_Id == 0) {
        Swal.fire('error', 'Please enter state', 'error');
        return false;
    }
    if (this.outlet.City_Id == null || this.outlet.City_Id == 0) {
        Swal.fire('error', 'Please enter city', 'error');
        return false;
    }
    if (this.outlet.OutletContactPerson == null || this.outlet.OutletContactPerson == '') {
        Swal.fire('error', 'Please enter outlet contact person', 'error');
        return false;
    }
    if (this.outlet.OutletEmail == null || this.outlet.OutletEmail == '') {
        Swal.fire('error', 'Please enter outlet email', 'error');
        return false;
  }
  if (this.outlet.OutletContactNumber == null || this.outlet.OutletContactNumber == '') {
      Swal.fire('error', 'Please enter outlet contact number', 'error');
      return false;
  }

if (this.outlet.IsGeoFencingAllowed && !this.outlet.Lattitude) {
     Swal.fire('error', 'Please enter Lattitude', 'error');
     return false;
 }
 if (this.outlet.IsGeoFencingAllowed && !this.outlet.Longitude) {
     Swal.fire('error', 'Please enter Longitude', 'error');
     return false;
 }
 if (this.outlet.IsGeoFencingAllowed && !this.outlet.ProximityDistance) {
     Swal.fire('error', 'Please enter Proximity Distance', 'error');
     return false;
 }
 
 this.outlet.ModifiedBy = this.session.User_Id;

 this.outletService.editOutlet(this.outlet).subscribe((data:any)=>{
  Swal.fire('Success', data, 'success');
   this.outletInit();
   },error=>{
   console.log(error);
   });
  }
  });
  }
  outletInit(){
  this.showSearchGrid = true;
  this.showForm = false;
  this.showEditForm = false;
  this.getFormDetails();
  }
}
