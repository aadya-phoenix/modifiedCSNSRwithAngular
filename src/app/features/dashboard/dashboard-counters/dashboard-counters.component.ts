import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';
import { CountersDetail } from 'src/app/models/countersDetail.model';
import { Csi } from 'src/app/models/csi.model';
import { Level } from 'src/app/models/level.model';
import { LevelDetailInfo } from 'src/app/models/levelDetailInfo.model';
import { LevelSearch } from 'src/app/models/levelSeach.model';
import { Outlet } from 'src/app/models/oultet.model';
import { Search } from 'src/app/models/search.model';
import { SMRAllCount } from 'src/app/models/smrAllCount.model';
import { TgtInfo } from 'src/app/models/tgtInfo.model';
import { ApiService } from '../../../services/api.service';
import { DashboardApiService } from '../services/dashboard-api.service';
import { RxFunctionService } from '../services/rx-function.service';

@Component({
  selector: 'app-dashboard-counters',
  templateUrl: './dashboard-counters.component.html',
  styleUrls: ['./dashboard-counters.component.css']
})
export class DashboardCountersComponent implements OnInit {
  @Input()
  labelObj!:any;

  searchObj: Search = this.constantService.searchObj;
  session = this.constantService.takeSession();
  levelSearchObj!: LevelSearch;
  levelDetail: LevelDetailInfo[] = [];
  levelObj: Level[] = [];
  outObj!: LevelSearch;
  outletObj: Outlet[] = [];
  countersDtl: any;
  CSI: any;
  CSISurvey: any;
  SMRAllCount!:SMRAllCount;
  TGTData: any ;

  Instant: boolean = false;
  Survey: boolean = false;
  SMR: boolean = false;
  PSFS: boolean = false;
  PERF: boolean = true;
  PSFSales: boolean = false;

  
  toggleEventSubscription!: Subscription;
  changeCountrySubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private constantService: ConstantsService,
    private dashapi: DashboardApiService,
    private rxService: RxFunctionService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    
    if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
      this.searchObj.Level_Id = this.session.DealerId;

      this.levelSearchObj = {
        Level_Id: this.searchObj.Level_Id,
        Leveldetail_Id: 0,
        UserName: this.session.UserName,
        Country_Id: this.searchObj.Country_Id
      };

      this.apiService.getLevelDetailListForZoneRegion(this.levelSearchObj).subscribe((data: any) => {
        this.levelDetail = data;

        if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
          this.searchObj.Leveldetail_Id = this.session.AccountId;
        }
        else {
          this.searchObj.Leveldetail_Id = this.levelDetail[0].Leveldetail_Id;
        }

        this.outObj = {
          Level_Id: this.searchObj.Level_Id,
          Leveldetail_Id: this.searchObj.Leveldetail_Id,
          UserName: this.session.UserName,
          Country_Id: this.searchObj.Country_Id
        };

        this.apiService.getOutletListBySublevel(this.outObj).subscribe((data: any) => {
          this.outletObj = data;
          this.getTargetAch();
        }, err => {
          console.log(err);
        });
      }, error => {
        console.log(error);
      });
    }
    else {
      this.apiService.getLevelList(this.session.Country_Id).subscribe((data: any) => {
        this.levelObj = data;
        this.searchObj.Level_Id = this.levelObj[0].Level_Id;

        this.levelSearchObj = {
          Level_Id: this.searchObj.Level_Id,
          Leveldetail_Id: 0,
          UserName: this.session.UserName,
          Country_Id: this.searchObj.Country_Id
        };

        this.apiService.getLevelDetailListForZoneRegion(this.levelSearchObj).subscribe((data: any) => {
          this.levelDetail = data;
          if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
            this.searchObj.Leveldetail_Id = this.session.AccountId;
          }
          else {
            this.searchObj.Leveldetail_Id = this.levelDetail[0].Leveldetail_Id;
          }
          this.getTargetAch();
        }, err => {
          console.log(err);
        });
      }, err => {
        console.log(err);
      });
    }
    this.toggleEventSubscription = this.rxService.getToggleEvent().subscribe((data) => {
      this.searchObj = data.obj;
      this.toggleDashboard(data.id);
    });

    this.changeCountrySubscription = this.rxService.getChangeCountryEvent().subscribe((data) => {
      this.searchObj = data.obj;
      this.changeCountry(data.id);
    });
  }

  getTargetAch(){
    this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
    this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

    this.apiService.getTargetAchivement(this.searchObj).subscribe((data: any) => {
      if(data){
      this.TGTData = data ;
      }
    }, error => {
      console.log(error);
    });
  }

  toggleDashboard(id: number) {
    if (id == 1) {
      this.Instant = true;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;

    this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
    this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

      this.apiService.dashboard_bkCounters(this.searchObj).subscribe((data) => {
        this.countersDtl = data;
      }, (error) => {
        console.log(error);
      });

      this.apiService.getDealerCSIForInstantFeedback(this.searchObj).subscribe((data: any) => {
        this.CSI = data;
      }, (error) => {
        console.log(error);
      });
    }

    if (id == 2) {
      this.Instant = false;
      this.Survey = true;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;

      this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
      this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

      this.apiService.surveyDashboard_bkCounters(this.searchObj).subscribe((data) => {
        this.countersDtl = data;
        console.log("this.countersDtl", this.countersDtl);
      }, (error) => {
        console.log(error);
      });
      this.apiService.getDealerCSIForSurvey(this.searchObj).subscribe((data: any) => {
        this.CSISurvey = data;
      }, (error) => {
        console.log(error);
      });
    }

    if (id == 3) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = true;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false

      this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
      this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

      this.dashapi.getServiceReminderAllCountForDashboard(this.searchObj).subscribe((data: any) => {
        this.SMRAllCount = data;
      }, error => {
        console.log(error);
      });
    }

    if (id == 4) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = true;
      this.PERF = false;
      this.PSFSales = false;

      this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
      this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

      this.apiService.PSFServiceDashboard_bkCounters(this.searchObj).subscribe(data => {
        this.countersDtl = data;
      }, error => {
        console.log(error);
      });

    }
    if (id == 5) {
      //CS&SRKPI
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = true;
      this.PSFSales = false;

     this.getTargetAch();
     
    }
    if (id == 6) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = true;

      this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
      this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

      this.apiService.PSFSalesDashboard_bkCounters(this.searchObj).subscribe(data => {
        this.countersDtl = data;
      }, error => {
        console.log(error);
      });
    }

  }
  changeCountry(id: number) {
    if (id == 1) {
      this.Instant = true;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;

      this.apiService.dashboard_bkCounters(this.searchObj).subscribe((data) => {
        this.countersDtl = data;
      }, (error) => {
        console.log(error);
      });

      this.apiService.getDealerCSIForInstantFeedback(this.searchObj).subscribe((data: any) => {
        this.CSI = data;
      }, (error) => {
        console.log(error);
      });
    }

    if (id == 2) {
      this.Instant = false;
      this.Survey = true;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;

      this.apiService.surveyDashboard_bkCounters(this.searchObj).subscribe((data) => {
        this.countersDtl = data;
        console.log("this.countersDtl", this.countersDtl);
      }, (error) => {
        console.log(error);
      });
      this.apiService.getDealerCSIForSurvey(this.searchObj).subscribe((data: any) => {
        this.CSISurvey = data;
      }, (error) => {
        console.log(error);
      });
    }

    if (id == 3) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = true;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false

      this.dashapi.getServiceReminderAllCountForDashboard(this.searchObj).subscribe((data: any) => {
        this.SMRAllCount = data;
      }, error => {
        console.log(error);
      });
    }

    if (id == 4) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = true;
      this.PERF = false;
      this.PSFSales = false;

      this.apiService.PSFServiceDashboard_bkCounters(this.searchObj).subscribe(data => {
        this.countersDtl = data;
      }, error => {
        console.log(error);
      });

    }
    if (id == 5) {
      //CS&SRKPI
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = true;
      this.PSFSales = false;

      this.apiService.getTargetAchivement(this.searchObj).subscribe((data: any) => {
        if(data){
        this.TGTData = data ;
        }
      }, error => {
        console.log(error);
      });
    }
    if (id == 6) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = true;

      this.apiService.PSFSalesDashboard_bkCounters(this.searchObj).subscribe(data => {
        this.countersDtl = data;
      }, error => {
        console.log(error);
      });
    }
  }
} 