import { Component, OnInit } from '@angular/core';
import { OutletTsm } from '../models/outletTsm.model';
import { DealerEmployee } from '../models/dealerEmployee.model';
import { LevelInfo } from '../../../models/levelInfo.model';
import { ConstantsService } from 'src/app/constants/constants.service';
import { CommonApiService } from '../services/common-api.service';
import { Dealer } from '../models/dealer.model';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tsm-master',
  templateUrl: './tsm-master.component.html',
  styleUrls: ['./tsm-master.component.css']
})
export class TsmMasterComponent implements OnInit {
  
  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;
  dealer!: Dealer;

  reqCountryId:any;
  tsmObj:OutletTsm[]=[];
  dealerObj:DealerEmployee[]=[];
  levelInfo:LevelInfo[] = [];
  outletLevelDtl:any;
  searchText:string='';
  session=this.constants.takeSession();

  constructor(
    private constants:ConstantsService,
    private commonApi:CommonApiService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reqCountryId  = this.route.snapshot.paramMap.get('id');
  
     if (this.session.RoleName === 'Distributor' || this.session.RoleName === 'HOAdmin' ) {
      this.reqCountryId = this.session.Country_Id;
    } 


    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
    
  
    this.dealer={
        Dealer_Id: 0,
        DealerCode: '',
        DealerName: '', 
        TSM: 0,
        IsActive : true,
        LevelInfo: [],
        CreatedBy: this.session.User_Id            
    }
  }

  getFormDetails(){
    
    console.log("this.session",this.session);
    this.commonApi.getTsmList(this.reqCountryId).subscribe((data:any)=>{
    // this.tsmObj = angular.copy(success.data);
      this.tsmObj = data;
     },error=>{
         console.log(error);
   }); 

  this.commonApi.getEmployeeBasedOnCountry(this.reqCountryId).subscribe((data:any)=>{
     //this.rpObj = angular.copy(success.data);
     this.dealerObj = data ;
  }, error=>{
      console.log(error);
  }); 
  }

  editTransaction(pt:OutletTsm){

    this.showEditForm = true;
    this.showSearchGrid = false;
    this.showForm = false;
    
    this.dealer.DealerName = pt.OutletName;
    this.dealer.DealerCode = pt.OutletCode;
    this.dealer.TSM = pt.TSM_Id;
    this.dealer.Dealer_Id = pt.Outlet_Id;

    this.commonApi.getLevelTsm(this.reqCountryId).subscribe((data:any)=>{
       this.levelInfo = data;

       this.commonApi.getLevelDetailsDealer(pt.Outlet_Id).subscribe(data=>{
         this.outletLevelDtl = data;

         this.levelInfo.forEach(value=>{
           this.outletLevelDtl.forEach((obj:any)=>{
             if(value.Level_Id === obj.Level_Id){
                value.Leveldetail_Id = obj.Level_detail_Id;
             }
           });
         });
       },err=>{
         console.log(err);
       })
    },err=>{
      console.log(err);
    });
  }

  deleteTransaction(pt:OutletTsm){

    this.dealer.DealerName = pt.OutletName;
    this.dealer.DealerCode = pt.OutletCode;
    this.dealer.TSM = pt.TSM_Id;
    this.dealer.Dealer_Id = pt.Outlet_Id;
    this.dealer.CreatedBy = this.session.User_Id;

    Swal.fire({
      title: "Are you sure?", text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
      }).then((result)=>{
        if(result.isConfirmed){
         this.commonApi.deleteDistributor(this.dealer).subscribe(data=>{
          Swal.fire(data);
          this.init();
         },err=>{
           console.log(err);
         });
        }
      });
  }

  editSaveTransaction(){
    Swal.fire({
      title: "Are you sure?", text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
  }).then((result):any=>{
    if(result.isConfirmed){
    if (this.dealer.TSM === null || this.dealer.TSM === 0) {
      Swal.fire('error', 'Please Select TSM', 'error');
      return false;
      }
      this.dealer.ModifiedBy = this.session.User_Id;
      this.dealer.LevelInfo =  this.levelInfo;
     
      this.commonApi.editDistributor(this.dealer).subscribe((data)=>{

        Swal.fire(data);
         this.init();
      },(error)=>{
          console.log(error);
      });
    }
  })
  }

  init(){
    this.dealer = {
      Dealer_Id: 0,
      DealerCode: '',
      DealerName: '',
      TSM: 0,
      IsActive: true,
      LevelInfo: [],
      CreatedBy: this.session.User_Id    
  };
  this.showSearchGrid = true;
  this.showForm = false;
  this.showEditForm = false;
  this.getFormDetails();
  
  }
  
}
