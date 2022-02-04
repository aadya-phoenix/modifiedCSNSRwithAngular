import { Component, Input, OnInit } from '@angular/core';

import * as _ from "lodash";
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Level } from 'src/app/models/level.model';
import { Outlet } from 'src/app/models/oultet.model';
import { Search } from 'src/app/models/search.model';
import { TgtInfo } from 'src/app/models/tgtInfo.model';
import { MonthWiseIns } from '../models/monthWiseIns.model';
import { LevelSearch } from 'src/app/models/levelSeach.model';
import { QuestionRptInfo } from '../models/questionRptInfo.model';
import { CountersDetail } from 'src/app/models/countersDetail.model';
import { LevelDetailInfo } from 'src/app/models/levelDetailInfo.model';
import { ServiceDueDoneInfo } from '../models/serviceDueDoneInfo.model';
import { SurveyRatingAnalysisModel } from '../models/surveyRatingAnalysis.model';
import { CustomerSatisfactionInfo } from '../models/customerSatisfactionInfo.model';


import { ApiService } from 'src/app/services/api.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { DashboardApiService } from '../services/dashboard-api.service';
import { QuestionTrendComponent } from '../question-trend/question-trend.component';
import { RxFunctionService } from '../services/rx-function.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-dashboard-graphs',
  templateUrl: './dashboard-graphs.component.html',
  styleUrls: ['./dashboard-graphs.component.css']
})
export class DashboardGraphsComponent implements OnInit {

  @Input()
  labelObj!: any;

  Instant: boolean = false;
  Survey: boolean = false;
  SMR: boolean = false;
  PSFS: boolean = false;
  PERF: boolean = true;
  PSFSales: boolean = false;

  searchObj: Search = this.constantService.takeSearchObject();
  session = this.constantService.takeSession();
  selectedLang: number = this.constantService.selectedLanguage;
  shareObj!:Search;

  levelSearchObj!: LevelSearch;
  levelDetail: LevelDetailInfo[] = [];
  levelObj: Level[] = [];
  outObj!: LevelSearch;
  outletObj: Outlet[] = [];
  TGTData!: TgtInfo;
  IFC: TgtInfo[] = [];
  SMRTGTList: TgtInfo[] = [];
  Email: TgtInfo[] = [];
  PSF: TgtInfo[] = [];
  TGTACH: any[] = [];
  AllMonth!: Search;
  Month: number = 0;
  Newdate: any;

  myChart: any;
  myChartSR: any;
  myChartInstant:any;
  myChartSmr:any;
  myChartEmail:any;
  myChartPsf:any;
  

  InsQuestionSatisfactionObj: QuestionRptInfo[] = [];
  QuestionSatisfactionObj: QuestionRptInfo[] = [];
  countersDtl: any;
  InsSatisfactionObj: MonthWiseIns[] = [];
  RatingAnalysis!: SurveyRatingAnalysisModel;
  SatisfactionObj: CustomerSatisfactionInfo[] = [];
  ServiceDueObj: ServiceDueDoneInfo[] = [];

  toggleSubscription!: Subscription;

  constructor(
    private constantService: ConstantsService,
    private dashapi: DashboardApiService,
    private apiService: ApiService,
    private rxService:RxFunctionService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) { 
    Chart.register(...registerables);
    
  }

  ngOnInit(): void {
    this.toggleSubscription = this.rxService.getToggleEvent().subscribe((data) => {
      this.searchObj = data.obj;
      this.toggleDashboard(data.id);
  });
  
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
        this.getData();

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
          this.getData();
        }, err => {
          console.log(err);
        });
      }, err => {
        console.log(err);
      });
    }
  }

  getData(){
    this.outObj = {
      Level_Id: this.searchObj.Level_Id,
      Leveldetail_Id: this.searchObj.Leveldetail_Id,
      UserName: this.session.UserName,
      Country_Id: this.searchObj.Country_Id
    };
    this.apiService.getOutletListBySublevel(this.outObj).subscribe((data: any) => {
      this.outletObj = data;
      this.getTargetAchData();
    }, err => {
      console.log(err);
    });
  }
  getTargetAchData(){
    this.searchObj.FromDate = this.datePipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
    this.searchObj.ToDate = this.datePipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

    this.apiService.getTargetAchivement(this.searchObj).subscribe((data: any) => {
      this.TGTData = data;
      this.TGTACH = [
        {
          'TGT': data.IFCTarget,
          'ACH': (data.IFCAch * 100).toFixed(2),
          'TGTType': 'IFC (%)'
        },
        {
          'TGT': data.SMRTarget,
          'ACH': (data.SMRAch * 100).toFixed(2),
          'TGTType': 'SMR (%)'
        },
        {
          'TGT': data.EmailTarget,
          'ACH': (data.EmailAch * 100).toFixed(2),
          'TGTType': 'EMAIL (%)'
        },
        {
          'TGT': data.PSFTarget,
          'ACH': (data.PSFAch * 100).toFixed(2),
          'TGTType': 'PSF (%)'
        },
      ];
      const tgt = this.TGTACH.map((x: any) => x.TGT);
      const ach = this.TGTACH.map((x: any) => x.ACH);
      const tgtType = this.TGTACH.map((x: any) => x.TGTType);
      this.myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: tgtType,
          datasets: [{
            label: 'Target',
            data: tgt,
            backgroundColor: [
              "#dd4b39"
            ],
            borderWidth: 1
          }, {
            label: 'Achievement',
            data: ach,
            backgroundColor: [
              "#00a65a"
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }, err => {
      console.log(err);
    });
    this.AllMonth = _.cloneDeep(this.searchObj);
    this.AllMonth.FromDate = '';

    const CurrntDate = new Date();
    this.Month = CurrntDate.getMonth() + 1;
    const CurrntYear = CurrntDate.getFullYear();

    if (this.Month < 6) {
      const NewMonth = 13 + (this.Month - 6);
      const NewYear = CurrntYear - 1;

      this.Newdate = new Date(NewYear, NewMonth - 1, 0o1);

      this.Newdate = this.datePipe.transform(this.Newdate, 'dd-MMM-yyyy');
      this.AllMonth.FromDate = this.Newdate;

    }
    if (this.Month >= 6) {
      const NewMonth = 1 + (this.Month - 6);
      const NewYear = CurrntYear;
      const Newdate = new Date(NewYear, NewMonth - 1, 0o1);
      this.AllMonth.FromDate = Newdate;
    }

    this.AllMonth.ToDate = this.datePipe.transform(this.searchObj.ToDate, 'dd-MMM-yyyy');
    this.apiService.getMonthWiseTargetAchivementForIFC(this.AllMonth).subscribe((data: any) => {
      this.IFC = data;

      const Month = this.IFC.map(x=>x.Month);
      const SerTarget = this.IFC.map(x=>x.SerTarget);
      const SerAch = this.IFC.map(x=>x.SerAch);
      this.myChartInstant = new Chart("myChartInstant", {
        type: 'bar',
        data: {
          labels: Month,
          datasets: [{
            label: 'Target',
            data: SerTarget,
            backgroundColor: [
              "#dd4b39"
            ],
            borderWidth: 1
          }, {
            label: 'Achievement',
            data: SerAch,
            backgroundColor: [
              "#00a65a"
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
    }, error => {
      console.log(error);
    });

    this.apiService.getMonthWiseTargetAchivementForSMR(this.AllMonth).subscribe((data: any) => {
      this.SMRTGTList = data;

      const Month = this.SMRTGTList.map(x=>x.Month);
      const SerTarget = this.SMRTGTList.map(x=>x.SerTarget);
      const SerAch = this.SMRTGTList.map(x=>x.SerAch);
      this.myChartSmr = new Chart("myChartSmr", {
        type: 'bar',
        data: {
          labels: Month,
          datasets: [{
            label: 'Target',
            data: SerTarget,
            backgroundColor: [
              "#dd4b39"
            ],
            borderWidth: 1
          }, {
            label: 'Achievement',
            data: SerAch,
            backgroundColor: [
              "#00a65a"
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }, error => {
      console.log(error);
    });


    this.apiService.getMonthWiseTargetAchivementForEmail(this.AllMonth).subscribe((data: any) => {
      this.Email = data;

      const Month = this.Email.map(x=>x.Month);
      const SerTarget = this.Email.map(x=>x.SerTarget);
      const SerAch = this.Email.map(x=>x.SerAch);
      this.myChartEmail = new Chart("myChartEmail", {
        type: 'bar',
        data: {
          labels: Month,
          datasets: [{
            label: 'Target',
            data: SerTarget,
            backgroundColor: [
              "#dd4b39"
            ],
            borderWidth: 1
          }, {
            label: 'Achievement',
            data: SerAch,
            backgroundColor: [
              "#00a65a"
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }, error => {
      console.log(error);
    });

    this.apiService.getMonthWiseTargetAchivementForPSF(this.AllMonth).subscribe((data: any) => {
      this.PSF = data;

      const Month = this.PSF.map(x=>x.Month);
      const SerTarget = this.PSF.map(x=>x.SerTarget);
      const SerAch = this.PSF.map(x=>x.SerAch);
      this.myChartPsf = new Chart("myChartPsf", {
        type: 'bar',
        data: {
          labels: Month,
          datasets: [{
            label: 'Target',
            data: SerTarget,
            backgroundColor: [
              "#dd4b39"
            ],
            borderWidth: 1
          }, {
            label: 'Achievement',
            data: SerAch,
            backgroundColor: [
              "#00a65a"
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }, error => {
      console.log(error);
    });
  }

  toggleDashboard(id: number) {
    //IFC
    if (id == 1) {
      this.Instant = true;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;

      this.searchObj.FromDate = this.datePipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
     this.searchObj.ToDate = this.datePipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

      this.apiService.QuestionFeedbackReport(this.searchObj).subscribe((data: any) => {
        if (data) {
          this.InsQuestionSatisfactionObj = data;
        }
      }, error => {
        console.log(error);
      });

      this.apiService.dashboard_bkCounters(this.searchObj).subscribe((data) => {
        this.countersDtl = data;
      }, (error) => {
        console.log(error);
      });

      this.dashapi.InstantSatisfactionTrend(this.searchObj).subscribe((data: any) => {
        if (data) {
          this.InsSatisfactionObj = data;
        }
      }, (error) => {
        console.log(error);
      });
    }
    //Survey
    if (id == 2) {
      this.Instant = false;
      this.Survey = true;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;

      this.searchObj.FromDate = this.datePipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
      this.searchObj.ToDate = this.datePipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

      this.apiService.QuestionSurveyAvgScore(this.searchObj).subscribe((data: any) => {
        if (data) {
          this.QuestionSatisfactionObj = data;
        }
      }, (error) => {
        console.log(error);
      });
      //Survey
      this.apiService.dashboard_bkSurveyRatingAnalysis(this.searchObj).subscribe((data: any) => {
        if (data) {
          this.RatingAnalysis = data;
        }
      }, (error) => {
        console.log(error);
      });

      this.apiService.surveyDashboard_bkCounters(this.searchObj).subscribe((data: any) => {
        this.countersDtl = data;
      }, (error) => {
        console.log(error);
      });
      this.apiService.getCustomerSatisfaction(this.searchObj).subscribe((data: any) => {
        if (data) {
          this.SatisfactionObj = data;
        }
      }, (error) => {
        console.log(error);
      });
    }
    if (id == 3) {
      //SMR
      this.Instant = false;
      this.Survey = false;
      this.SMR = true;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false

      this.searchObj.FromDate = this.datePipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
      this.searchObj.ToDate = this.datePipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');

      if (this.session.RoleName == 'DealerAdmin') {
        this.searchObj.Country_Id = this.session.Country_Id;
      }
      this.apiService.getServiceDueVsDoneForVehicle(this.searchObj).subscribe((data: any) => {
        if (data) {
          this.ServiceDueObj = data;

          const ServiceType = this.ServiceDueObj.map(x=>x.ServiceType);
          const ServiceDue = this.ServiceDueObj.map(x=>x.ServiceDue);
          const ServiceDone = this.ServiceDueObj.map(x=>x.ServiceDone);
          this.myChartInstant = new Chart("myChartSR", {
            type: 'bar',
            data: {
              labels: ServiceType,
              datasets: [{
                label: 'Target',
                data: ServiceDue,
                backgroundColor: [
                  "#dd4b39"
                ],
                borderWidth: 1
              }, {
                label: 'Achievement',
                data: ServiceDone,
                backgroundColor: [
                  "#00a65a"
                ]
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

        }
      }, (error) => {
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

    }
    if (id == 5) {
      //CS&SRKPI
    
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = true;
      this.PSFSales = false;

      this.myChart.destroy();

      this.getTargetAchData();

    }
    if (id == 6) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = true;
    }
  }
  showFeedbackDetail() {
    this.shareObj = this.searchObj;
    this.dialog.open(QuestionTrendComponent, {data:{obj:this.shareObj}});
  }
  showDetail(){}
}
