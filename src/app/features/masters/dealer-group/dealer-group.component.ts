import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { Country } from '../../../models/country.model';
import { City } from '../models/city.model';
import { Distributor } from '../models/distributor.model';
import { State } from '../models/state.model';
import { CommonApiService } from '../services/common-api.service';
import { DealerLi } from './dealerLi.model';
import { DealerService } from './dealer.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddDealerComponent } from './add-dealer/add-dealer.component';

@Component({
  selector: 'app-dealer-group',
  templateUrl: './dealer-group.component.html',
  styleUrls: ['./dealer-group.component.css']
})
export class DealerGroupComponent implements OnInit {

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;

  dealerObj:DealerLi[] = [];
  distributorObj:Distributor[] = [];
  countryObj:Country[] = [];
  stateObj:State[] = [];
  cityObj:City[] = [];
  dealer!:DealerLi;
  session = this.constant.takeSession();
  myFile:any;
  searchText:string = '';

  constructor(
    private dealerService:DealerService,
    private apiService:CommonApiService,
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
    this.apiService.getDealerList().subscribe((data:any)=>{
      this.dealerObj = data;
     },error=>{
         console.log(error);
     });
     this.apiService.getDistributorList().subscribe((data:any)=>{
         this.distributorObj = data;
     },error=>{
         console.log(error);
     });
     this.masterService.getCountryList().subscribe((data:any)=>{
         this.countryObj = data;
     },error=>{
         console.log(error);
     });
  }
  addDealer(){
    this.dealer = {
      Dealer_Id: 0,
      DealerCode: '',
      DealerName: '',
      DealerAddress: '',
      State_Id: 0,
      StateName:'',
      City_Id: 0,
      CityName:'',
      Distributor_Id: 0,
      DistributorName:'',
      Country_Id: 0,
      CountryName:'',
      Company_Id: 1,
      DealerLogo:'',
      UrlPath:'',
      IsActive: true,
      CreatedBy: this.session.User_Id,
      DealerContact: '',
      DealerEmail: '',
      DealerContactNumber: ''
    }
     this.showSearchGrid = false;
     this.showForm = true;
     this.showEditForm = false;
  }
  addUpload(){
    this.dialog.open(AddDealerComponent,{
      disableClose: true,
      panelClass: 'custom-dialog-container',
      width:'550px',
      height:'265px'

    });
  }

  getState(countryId:number){
    this.apiService.getState(countryId).subscribe((data:any)=>{
      this.stateObj = data;
    }, error => {
      console.log(error);
    });
  }

  getCity(stateId:number){
    this.apiService.getCity(stateId).subscribe((data:any)=>{
      this.cityObj = data;
    }, error => {
      console.log(error);
    });
  }

  uploadLogo(event:any){
   this.myFile = event.target.files[0];
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
    const fd = new FormData();
    if (this.dealer.Distributor_Id == null || this.dealer.Distributor_Id == 0) {
        Swal.fire('error', 'Please select Distributor ', 'error');
        return false;
       }
       if (this.dealer.DealerName == null || this.dealer.DealerName == '') {
           Swal.fire('error', 'Please enter Dealer name', 'error');
           return false;
       }
       if (this.dealer.DealerCode == null || this.dealer.DealerCode == '') {
           Swal.fire('error', 'Please enter Dealer code', 'error');
           return false;
       }
       if (this.dealer.DealerAddress == null || this.dealer.DealerAddress == '') {
           Swal.fire('error', 'Please enter Dealer address', 'error');
           return false;
       }
       if (this.dealer.Country_Id == null || this.dealer.Country_Id == 0) {
           Swal.fire('error', 'Please enter country', 'error');
           return false;
       }
       if (this.dealer.State_Id == null || this.dealer.State_Id == 0) {
           Swal.fire('error', 'Please enter state', 'error');
           return false;
       }
       if (this.dealer.City_Id == null || this.dealer.City_Id == 0) {
           Swal.fire('error', 'Please enter city', 'error');
           return false;
       }
       if (this.dealer.DealerContact == null || this.dealer.DealerContact == '') {
           Swal.fire('error', 'Please enter Dealer contact person', 'error');
           return false;
       }
       if (this.dealer.DealerEmail == null || this.dealer.DealerEmail == '') {
           Swal.fire('error', 'Please enter Dealer email', 'error');
           return false;
       }
       if (this.dealer.DealerContactNumber == null || this.dealer.DealerContactNumber == '') {
           Swal.fire('error', 'Please enter Dealer contact number', 'error');
           return false;
       }

        fd.append('file', this.myFile);
        fd.append('Dealer', JSON.stringify(this.dealer));

        this.dealerService.addDealer(fd).subscribe((data:any)=>{
          Swal.fire('Success', data, 'success');
          this.dealerInit();
      },error=>{
        console.log(error);
    });
   }
  });
 }

  dealerInit(){
   this.showSearchGrid = true;
   this.showForm = false;
   this.showEditForm = false;
   this.getFormDetails();
  }

  editTransaction(pt:DealerLi){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true;

    this.dealer = pt;
    this.getState(this.dealer.Country_Id);
    this.getCity(this.dealer.State_Id);
  }

  deleteTransaction(pt:DealerLi){
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

    this.dealerService.deleteDealer(pt).subscribe((data:any)=>{
        Swal.fire('Success', data, 'success');
       this.dealerInit();
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
    if (this.dealer.Distributor_Id == null || this.dealer.Distributor_Id == 0) {
      Swal.fire('error', 'Please select Distributor ', 'error');
      return false;
     }
     if (this.dealer.DealerName == null || this.dealer.DealerName == '') {
         Swal.fire('error', 'Please enter Dealer name', 'error');
         return false;
     }
     if (this.dealer.DealerCode == null || this.dealer.DealerCode == '') {
         Swal.fire('error', 'Please enter Dealer code', 'error');
         return false;
     }
     if (this.dealer.DealerAddress == null || this.dealer.DealerAddress == '') {
         Swal.fire('error', 'Please enter Dealer address', 'error');
         return false;
     }
     if (this.dealer.Country_Id == null || this.dealer.Country_Id == 0) {
         Swal.fire('error', 'Please enter country', 'error');
         return false;
     }
     if (this.dealer.State_Id == null || this.dealer.State_Id == 0) {
         Swal.fire('error', 'Please enter state', 'error');
         return false;
     }
     if (this.dealer.City_Id == null || this.dealer.City_Id == 0) {
         Swal.fire('error', 'Please enter city', 'error');
         return false;
     }
     if (this.dealer.DealerContact == null || this.dealer.DealerContact == '') {
         Swal.fire('error', 'Please enter Dealer contact person', 'error');
         return false;
     }
     if (this.dealer.DealerEmail == null || this.dealer.DealerEmail == '') {
         Swal.fire('error', 'Please enter Dealer email', 'error');
         return false;
     }
     if (this.dealer.DealerContactNumber == null || this.dealer.DealerContactNumber == '') {
         Swal.fire('error', 'Please enter Dealer contact number', 'error');
         return false;
     }

     this.dealer.ModifiedBy = this.session.User_Id;
     const fd = new FormData();

     fd.append('file', this.myFile);
     fd.append('Dealer', JSON.stringify(this.dealer));

     this.dealerService.editDealer(fd).subscribe((data:any)=>{
         Swal.fire('Success', data, 'success');
        this.dealerInit();
     },error=>{
      console.log(error);
  });
  }
  });
  }
}
