import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { LevelInfo } from 'src/app/models/levelInfo.model';
import { Outlet } from 'src/app/models/oultet.model';
import { DealerLi } from '../dealer-group/dealerLi.model';
import { City } from '../models/city.model';
import { OutletType } from '../models/outletType.model';
import { State } from '../models/state.model';
import { CommonApiService } from '../services/common-api.service';
import { DealerOutletMapService } from './dealer-outlet-map.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dealer-outlet-map',
  templateUrl: './dealer-outlet-map.component.html',
  styleUrls: ['./dealer-outlet-map.component.css']
})
export class DealerOutletMapComponent implements OnInit {

  showSearchGrid :boolean = true;
  showEditForm :boolean = false;
  goAhead:boolean=false;

  session = this.constant.takeSession();
  searchText:string='';

  dealerObj: DealerLi[]=[] ;
  outletObj:Outlet[]=[];
  outletTypeObj: OutletType[]=[];
  outlet!:Outlet;
  outletLevelDtl:any;
  stateObj:State[]=[];
  levelInfo:LevelInfo[]=[];
  cityObj:City[]=[];

  constructor(
    private constant:ConstantsService,
    private commonApiService:CommonApiService,
    private dealerOutletMapService:DealerOutletMapService

  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showEditForm = false;
    this.getFormDetails();
  }

  getFormDetails(){
    this.commonApiService.getDealerList().subscribe((data:any)=>{
      this.dealerObj = data;
  },error=>{
      console.log(error);
  });

  this.dealerOutletMapService .getDealerOutletList(this.session.User_Id).subscribe((data:any)=>{
    this.outletObj = data;
    },error=>{
    console.log(error);
   });

   this.commonApiService.getOutletTypeList().subscribe((data:any)=>{
    this.outletTypeObj = data;
    },error=>{
    console.log(error);
   });
  

  }

  editTransaction(pt:Outlet){
    this.showSearchGrid = false;
    this.showEditForm =  true;

    this.outlet = pt;

    this.getLevelDetails(pt.Outlet_Id);
    
    for (let dealer of this.dealerObj){
      if (dealer.Dealer_Id == this.outlet.Dealer_Id) {
          this.getState(dealer.Country_Id);
      }
    }
    this.getCity(this.outlet.State_Id);
  }

  getLevelDetails(id:number){
    this.commonApiService.getLevelDetailsDealer(id).subscribe((data:any)=>{
      this.outletLevelDtl = data;;
    },error=>{
      console.log(error);
     });
  }
  getCity(id:number){
    this.commonApiService.getCity(id).subscribe((data:any)=>{
      this.cityObj = data;
     },error=>{
      console.log(error);
     });
  }

  getState(id:number){
    this.commonApiService.getState(id).subscribe((data:any)=>{
      this.stateObj = data;
       },error=>{
      console.log(error);
     });

     this.commonApiService.getLevelTsm(id).subscribe((data:any)=>{
       this.levelInfo = data;
       for(let level of this.levelInfo){
          for(let outlet of this.outletLevelDtl){
            if(level.Level_Id === outlet.Level_id){
              level.Leveldetail_Id = outlet.Level_detail_Id;
            }
          }
        }
       },error=>{
        console.log(error);
     });
   }

  init(){
    this.showSearchGrid = true;
    this.showEditForm = false;
    this.getFormDetails();
  }

  getCountryFromDealer(id:number){
    for(let dealer of this.dealerObj){
      if (dealer.Dealer_Id == id) {
        this.getState(dealer.Country_Id);
     }
   }
  }

  editSaveTransaction(){
    this.goAhead=false;
    
    this.levelInfo.forEach((value,index):any=>{
      if (value.Leveldetail_Id === 0 && this.levelInfo.length - 1 !== index) {
        this.goAhead = true;
        Swal.fire("error", "Please select Zone/Region/City, it can not be selected as ALL ", "error");
        return false;
      }
    });
    this.outlet.LevelInfo = this.levelInfo;

        if (this.goAhead === false) {
            Swal.fire({
              title: "Are you sure?", text: "Are you sure you want to continue this process?",
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
               this.outlet.ModifiedBy = this.session.User_Id;

             this.dealerOutletMapService.editOutlet(this.outlet).subscribe((data:any)=>{
              Swal.fire('Success', data, 'success');
                 this.init();
                },error=>{
                  console.log(error);
                 });
                }
             });
        }
  }

}
