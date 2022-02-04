import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../services/common-api.service';
import Swal from 'sweetalert2';
import { ConstantsService } from 'src/app/constants/constants.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-level',
  templateUrl: './sub-level.component.html',
  styleUrls: ['./sub-level.component.css']
})
export class SubLevelComponent implements OnInit {

  showSearchGrid: boolean = false;
  reqCountryId: any;
  levelObj: any
  levelId: number = 0;
  levelDetail: any;
  session: any = this.constant.takeSession();
  searchText:string='';

  constructor(
    private commonApi: CommonApiService,
    private constant: ConstantsService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.showSearchGrid = true;
    this.getFormDetails();
    this.reqCountryId  = this.route.snapshot.paramMap.get('id');
    
  }

  getFormDetails() {
    this.commonApi.getSubLevel(this.reqCountryId).subscribe(data => {
      this.levelObj = data;
    }, err => {
      console.log(err);
    }
    )
  }

  getLevelDetails(levelId: number) {
    this.commonApi.getLevelDetails(this.reqCountryId, levelId).subscribe(data => {
      this.levelDetail = data;
    }, err => {
      console.log(err);
    })
  }

  add(): any {
    if (this.levelId == null || this.levelId == undefined) {
      Swal.fire("Error", "Please select level", "error");
      return false;
    }

    this.levelDetail.push({
      Level_Id: this.levelId,
      Leveldetail_Id: null,
      LevelName: "",
      LeveldetailName: "",
      TextBox: "",
      Designation: "",
      UserName: "",
      Password: "",
      EmployeeName: "",
      LevelObj: [],
      EmployeeObj: [],
      Employee_Id: null,
      IsActive: null,
      ModifiedBy: this.session.User_Id,
      ModifiedOn: null,
      CreatedOn: null,
      CreatedBy: this.session.User_Id,
      AccountId: this.session.AccountId,
      DealerId: this.session.DealerId,
      User_Id: this.session.User_Id,
      Country_Id: this.reqCountryId,
    });
  }

  deleteTransaction(levelDetailId:number, index:number){
    if (levelDetailId == null) {
      this.levelDetail.splice(index, 1);
  }
  else {
    var result = confirm("Are you sure u want to delete this data");
    if (result) {
        this.commonApi.deleteLevelDetail(levelDetailId).subscribe((data:any)=>{
            if (data == 'Success') {
                Swal.fire("success", data, "success");
            }
            else {
              Swal.fire("Error", data, "error");
            }
          //this.init();
        });
    }

}
  }

  back(){
    this.router.navigateByUrl('/index/country');
   }

 saveForm(){
  //$scope.LevelDetail.Country_Id = $rootScope.SubLevelCountry_Id;
 }



}
