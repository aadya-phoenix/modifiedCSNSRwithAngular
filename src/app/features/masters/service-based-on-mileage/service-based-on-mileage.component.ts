import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { ApiService } from 'src/app/services/api.service';
import { ServiceBasedOnMileageService } from './service-based-on-mileage.service';
import Swal from 'sweetalert2';
import {  ServiceInfo } from './serviceInfo.model';
import { ConstantsService } from 'src/app/constants/constants.service';

@Component({
  selector: 'app-service-based-on-mileage',
  templateUrl: './service-based-on-mileage.component.html',
  styleUrls: ['./service-based-on-mileage.component.css']
})
export class ServiceBasedOnMileageComponent implements OnInit {

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;

  session= this.constant.takeSession();
  ModifiedBy:number=0;

  countryObj:Country[]=[];
  myObj:any[]=[];
  YesNoDropDown = ['Defalut SMR Logic','Periodic SMR Logic'];
  service!:ServiceInfo;

  constructor(
    private apiService:ApiService,
    private constant:ConstantsService,
    private serviceOn:ServiceBasedOnMileageService
  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();

    this.service={
      Country_Id: 0,
      IsTrue: '',
      Id:0,
      IsActive: true,
      CreatedBy: this.session.User_Id,
    }
  }

  getFormDetails(){
    this.apiService.getCountryList().subscribe((data:any)=>{
      this.countryObj = data;
    },error=>{
      console.log(error);
   });

   this.serviceOn.getCountryBasedOnMilage().subscribe((data:any)=>{
     this.myObj = data;
    },error=>{
     console.log(error);
   });

  }

  addService(){
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
      if (this.service.IsTrue == null || this.service.IsTrue == '') {
        Swal.fire('error', 'Please enter Defalut SMR/Periodic SMR', 'error');
        return false;
     }
    if (this.service.Country_Id == null || this.service.Country_Id == 0) {
      Swal.fire('error', 'Please select country name', 'error');
        return false;
    }

    this.serviceOn.addCountryBasedOnMilage(this.service).subscribe((data:any)=>{
      if (data == 'Success') {
        Swal.fire('Success', 'Country added successfully', 'success');
          this.init();
      }
      else {
        Swal.fire('Error', data, 'error');
      }
     },error=>{
       console.log(error);
     });
    }});
  }

  init(){
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }

  editTransaction(pt:any){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true;
  }

  deleteTransaction(pt:any){
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
      this.service.IsActive = false;
      this.service.Id = pt.Id;
      this.ModifiedBy = this.session.User_Id;
      this.serviceOn.editCountryBasedOnMilage(this.service).subscribe((data:any)=>{
        if (data == 'Success') {
            Swal.fire('Success', 'Country updated successfully', 'success');
            this.init();
        }
        else {
            Swal.fire('Error', data, 'error');
        }
      },(error)=>{
        console.log(error);
     });
    }
   });
  }

  editSaveTransaction():any{
    if (this.service.IsTrue == null || this.service.IsTrue == '') {
      Swal.fire('error', 'Please enter Defalut SMR/Periodic SMR', 'error');
      return false;
    }
    if (this.service.Country_Id == null || this.service.Country_Id == 0) {
      Swal.fire('error', 'Please select country name', 'error');
      return false;
    }
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
       this.serviceOn.editCountryBasedOnMilage(this.service).subscribe((data:any)=>{
        if (data == 'Success') {
          Swal.fire('Success', 'Country updated successfully', 'success');
            this.init();
        }
        else {
          Swal.fire('Error', data, 'error');
        }
       },(error)=>{
        console.log(error);
     });
    }
   });
  }

}
