import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Country } from 'src/app/models/country.model';
import { Label } from 'src/app/models/label.model';
import { Outlet } from 'src/app/models/oultet.model';
import { Search } from 'src/app/models/search.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { ApiService } from '../../../services/api.service';
import { RxFunctionService } from '../services/rx-function.service';
import { DatePipe } from '@angular/common';
import { Level } from 'src/app/models/level.model';
import { LevelSearch } from 'src/app/models/levelSeach.model';
import { LevelDetailInfo } from 'src/app/models/levelDetailInfo.model';


@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.css']

})
export class DashboardFilterComponent implements OnInit {

  labelObj: Label[] = [];
  searchObj: Search = this.constantService.takeSearchObject();
  outletObj: Outlet[] = [];
  vehicleTypeObj: VehicleType[] = [];
  countryObj: Country[] = [];
  levelObj: Level[] = [];
  levelSearchObj!: LevelSearch;
  outObj!: LevelSearch;
  levelDetail: LevelDetailInfo[] = [];

  selectedLanguage: number = this.constantService.selectedLanguage;
  defaultLanguage: boolean = this.constantService.defaultLanguage;
  surveyTypeId: number = this.constantService.surveyTypeId;
  session = this.constantService.takeSession();
  Role = this.session.RoleName;
  resultLabelObj:any;

  Instant: boolean = false;
  Survey: boolean = false;
  SMR: boolean = false;
  PSFS: boolean = false;
  PERF: boolean = true;
  PSFSales: boolean = false;


  CSSRKPILabel: string = '';
  CountryLabel: string = '';
  DealerOutletCodeLabel: string = '';
  SwitchToLabel: string = '';
  InstantFeedbackLabel: string = '';
  SurveyFeedbackLabel: string = '';
  ServiceRemindersLabel: string = '';
  SurveyAnalysisLabel: string = '';
  PostServiceFollowupLabel: string = '';
  PostSalesFollowupLabel: string = '';
  FromDateLabel: string = '';
  ToDateLabel: string = '';
  VehicleLabel: string = '';
  SearchLabel: string = '';
  TargetVsAchievementLabel: string = '';
  FEEDBACKTARGETLabel: string = '';
  SMRTARGETLabel: string = '';
  UPLOADTARGETLabel: string = '';
  EMAILTARGETLabel: string = '';
  PSFTARGETLabel: string = '';
  AchievementLabel: string = '';
  TargetVsAchievementServiceLoadLabel: string = '';
  TargetVsAchievementInstantFeedbackLabel: string = '';
  TargetVsAchievementSMRLabel: string = '';
  TargetVsAchievementEmailLabel: string = '';
  TargetVsAchievementPSFLabel: string = '';
  SERVICEDONELabel: string = '';
  FeedbackCapturedLabel: string = '';
  CSILabel: string = '';
  SATISFIEDLabel: string = '';
  QuestionWiseRatingLabel: string = '';
  DISSATISFIEDLabel: string = '';
  MonthwiseCustomerSatisfactionTrendLabel: string = '';
  SURVEYSENTLabel: string = '';
  TELEPHONICSURVEYLabel: string = '';
  SURVEYCOMPLETEDLabel: string = '';
  SatisfiedvsDissatisfiedCustomersLabel: string = '';
  ServicecalldueLabel: string = '';
  YETTOCONTACTLabel: string = '';
  CONTACTEDLabel: string = '';
  NONCONTACTABLELabel: string = '';
  BOOKINGLabel: string = '';
  SERVICECONVERTEDLabel: string = '';
  ServiceCallDueVsServiceDoneLabel: string = '';
  TOTALDUELabel: string = '';
  HighlySatisfiedLabel: string = '';
  HighlyDissatisfiedLabel: string = '';
  SurveysubmittedviaSMSLabel: string = '';
  SurveysubmittedviaMailLabel: string = '';
  SurveysubmittedviaTelephonicLabel: string = '';

  constructor(
    private apiService: ApiService,
    private constantService: ConstantsService,
    private rxService: RxFunctionService,
    private datepipe: DatePipe

  ) { }

  ngOnInit(): void {

    let obs: Observable<Label> = this.apiService.getLabel();
    obs.subscribe((data: any) => {
      this.labelObj = data;
      this.selectLanguage(this.selectedLanguage);      
    }, (err: any) => {
      console.log("label object error..", err);
    });

    this.apiService.getVehicleTypeForDDL().subscribe((data: any) => {
      this.vehicleTypeObj = data;
    }, (error) => {
      console.log(error);
    });

    this.apiService.getCountryList().subscribe((data: any) => {
      this.countryObj = data;

    }, (error) => {
      console.log(error);
    });

    if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
      this.searchObj.Level_Id = this.session.DealerId;
      this.searchObj.Leveldetail_Id = this.session.AccountId;

      this.apiService.getLevelListForZoneRegion(this.session.Country_Id, this.session.DealerId).subscribe
        ((data: any) => {
          this.levelObj = data;

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
            }, err => {
              console.log(err);
            });
          }, error => {
            console.log(error);
          });
        }, err => {
          console.log(err);
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

          this.outObj = {
            Level_Id: this.searchObj.Level_Id,
            Leveldetail_Id: this.searchObj.Leveldetail_Id,
            UserName: this.session.UserName,
            Country_Id: this.searchObj.Country_Id
          };

          this.apiService.getOutletListBySublevel(this.outObj).subscribe((data: any) => {
            this.outletObj = data;
            this.initDetails();
          }, error => {
            console.log(error);
          });
        }, err => {
          console.log(err);
        });
      }, error => {
        console.log(error);
      });
    }
  }

  initDetails() { }
  selectLanguage(id: number){
    if (id == 2) {
      this.defaultLanguage = true;
      for(const label of this.labelObj){
        if (label.DefaultLanguage == '"CS+SR" - KPI') {
          this.CSSRKPILabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Country') {
          this.CountryLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Dealer Outlet Code') {
          this.DealerOutletCodeLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Switch To') {
          this.SwitchToLabel = label.ConvertedLanguage;
        }
        if (label.DefaultLanguage == 'Instant Feedback') {
          this.InstantFeedbackLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Survey Feedback') {
          this.SurveyFeedbackLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Service Reminders') {
          this.ServiceRemindersLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Survey Analysis') {
          this.SurveyAnalysisLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Post Service Follow-up') {
          this.PostServiceFollowupLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Post Sales Follow-up') {
          this.PostSalesFollowupLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'From Date') {
          this.FromDateLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'To Date') {
          this.ToDateLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Vehicle') {
          this.VehicleLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Search') {
          this.SearchLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Target Vs Achievement') {
          this.TargetVsAchievementLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'UPLOAD TARGET') {
          this.UPLOADTARGETLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'INSTANT FEEDBACK TARGET') {
          this.FEEDBACKTARGETLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'SERVICE REMINDER TARGET') {
          this.SMRTARGETLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'EMAIL TARGET') {
          this.EMAILTARGETLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'POST SERVICE FOLLOWUP TARGET') {
          this.PSFTARGETLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Achievement') {
          this.AchievementLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Target Vs Achievement - Service Load') {
          this.TargetVsAchievementServiceLoadLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Target Vs Achievement - Instant Feedback') {
          this.TargetVsAchievementInstantFeedbackLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Target Vs Achievement - Service Reminder') {
          this.TargetVsAchievementSMRLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Target Vs Achievement - Email') {
          this.TargetVsAchievementEmailLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Target Vs Achievement -Post Service Followup') {
          this.TargetVsAchievementPSFLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'SERVICE DONE') {
          this.SERVICEDONELabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Feedback Captured') {
          this.FeedbackCapturedLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'CSI') {
          this.CSILabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'SATISFIED') {
          this.SATISFIEDLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Question Wise Rating') {
          this.QuestionWiseRatingLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'DISSATISFIED') {
          this.DISSATISFIEDLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Month wise Customer Satisfaction Trend') {
          this.MonthwiseCustomerSatisfactionTrendLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'SURVEY SENT') {
          this.SURVEYSENTLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'TELEPHONIC SURVEY') {
          this.TELEPHONICSURVEYLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'SURVEY COMPLETED') {
          this.SURVEYCOMPLETEDLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Satisfied vs Dis-satisfied Customers') {
          this.SatisfiedvsDissatisfiedCustomersLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Service call due') {
          this.ServicecalldueLabel = label.DefaultLanguage;
        } if (label.DefaultLanguage == 'YET TO CONTACT') {
          this.YETTOCONTACTLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'CONTACTED') {
          this.CONTACTEDLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'NON CONTACTABLE') {
          this.NONCONTACTABLELabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'BOOKING') {
          this.BOOKINGLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'SERVICE CONVERTED') {
          this.SERVICECONVERTEDLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Service Call Due Vs Service Done') {
          this.ServiceCallDueVsServiceDoneLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'TOTAL DUE') {
          this.TOTALDUELabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Highly Satisfied') {
          this.HighlySatisfiedLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Highly Dissatisfied') {
          this.HighlyDissatisfiedLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Survey submitted via SMS') {
          this.SurveysubmittedviaSMSLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Survey submitted via Mail') {
          this.SurveysubmittedviaMailLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'Survey submitted via Telephonic') {
          this.SurveysubmittedviaTelephonicLabel = label.DefaultLanguage;
        }
        if (label.DefaultLanguage == 'SURVEY COMPLETED') {
          this.SURVEYCOMPLETEDLabel = label.DefaultLanguage;
        }
      }
    }
    if (id > 2) {
      this.defaultLanguage = false;
      for(const label of this.labelObj) {
        if (label.Language_Id == id) {
          if (label.DefaultLanguage == '"CS+SR" - KPI') {
            this.CSSRKPILabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Switch To') {
            this.SwitchToLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Instant Feedback') {
            this.InstantFeedbackLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Survey Feedback') {
            this.SurveyFeedbackLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Service Reminders') {
            this.ServiceRemindersLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Survey Analysis') {
            this.SurveyAnalysisLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Post Service Follow-up') {
            this.PostServiceFollowupLabel = label.DefaultLanguage;
          }
          if (label.DefaultLanguage == 'Post Sales Follow-up') {
            this.PostSalesFollowupLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'From Date') {
            this.FromDateLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'To Date') {
            this.ToDateLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Vehicle') {
            this.VehicleLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Search') {
            this.SearchLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Target Vs Achievement') {
            this.TargetVsAchievementLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'UPLOAD TARGET') {
            this.UPLOADTARGETLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'INSTANT FEEDBACK TARGET') {
            this.FEEDBACKTARGETLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'SERVICE REMINDER TARGET') {
            this.SMRTARGETLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'EMAIL TARGET') {
            this.EMAILTARGETLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'POST SERVICE FOLLOWUP TARGET') {
            this.PSFTARGETLabel = label.ConvertedLanguage;
          } if (label.DefaultLanguage == 'Achievement') {
            this.AchievementLabel = label.ConvertedLanguage;
          }

          if (label.DefaultLanguage == 'Target Vs Achievement - Service Load') {
            this.TargetVsAchievementServiceLoadLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Target Vs Achievement - Instant Feedback') {
            this.TargetVsAchievementInstantFeedbackLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Target Vs Achievement - Service Reminder') {
            this.TargetVsAchievementSMRLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Target Vs Achievement - Email') {
            this.TargetVsAchievementEmailLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Target Vs Achievement -Post Service Followup') {
            this.TargetVsAchievementPSFLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'SERVICE DONE') {
            this.SERVICEDONELabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Feedback Captured') {
            this.FeedbackCapturedLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'CSI') {
            this.CSILabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'SATISFIED') {
            this.SATISFIEDLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Question Wise Rating') {
            this.QuestionWiseRatingLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'DISSATISFIED') {
            this.DISSATISFIEDLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Month wise Customer Satisfaction Trend') {
            this.MonthwiseCustomerSatisfactionTrendLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'SURVEY SENT') {
            this.SURVEYSENTLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'TELEPHONIC SURVEY') {
            this.TELEPHONICSURVEYLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'SURVEY COMPLETED') {
            this.SURVEYCOMPLETEDLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Satisfied vs Dis-satisfied Customers') {
            this.SatisfiedvsDissatisfiedCustomersLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Service call due') {
            this.ServicecalldueLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'YET TO CONTACT') {
            this.YETTOCONTACTLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'CONTACTED') {
            this.CONTACTEDLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'NON CONTACTABLE') {
            this.NONCONTACTABLELabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'BOOKING') {
            this.BOOKINGLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'SERVICE CONVERTED') {
            this.SERVICECONVERTEDLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Service Call Due Vs Service Done') {
            this.ServiceCallDueVsServiceDoneLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'TOTAL DUE') {
            this.TOTALDUELabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Highly Satisfied') {
            this.HighlySatisfiedLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Highly Dissatisfied') {
            this.HighlyDissatisfiedLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Survey submitted via SMS') {
            this.SurveysubmittedviaSMSLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Survey submitted via Mail') {
            this.SurveysubmittedviaMailLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Survey submitted via Telephonic') {
            this.SurveysubmittedviaTelephonicLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'SURVEY COMPLETED') {
            this.SURVEYCOMPLETEDLabel = label.ConvertedLanguage;
          }
          if (label.DefaultLanguage == 'Country') {
            this.CountryLabel = label.ConvertedLanguage;
          }

          if (label.DefaultLanguage == 'Dealer Outlet Code') {
            this.DealerOutletCodeLabel = label.ConvertedLanguage;
          }
        }
      }
    }
    this.resultLabelObj = {
      CSSRKPILabel:this.CSSRKPILabel,
      CountryLabel:this.CountryLabel,
      DealerOutletCodeLabel:this.DealerOutletCodeLabel,
      SwitchToLabel:this.SwitchToLabel,
      InstantFeedbackLabel:this.InstantFeedbackLabel,
      SurveyFeedbackLabel:this.SurveyFeedbackLabel,
      ServiceRemindersLabel:this.ServiceRemindersLabel,
      SurveyAnalysisLabel:this.SurveyAnalysisLabel,
      PostServiceFollowupLabel:this.PostServiceFollowupLabel,
      PostSalesFollowupLabel :this.PostSalesFollowupLabel,
      FromDateLabel:this.FromDateLabel,
      ToDateLabel :this.ToDateLabel,
      VehicleLabel:this.VehicleLabel,
      SearchLabel:this.SearchLabel,
      TargetVsAchievementLabel :this.TargetVsAchievementLabel,
      UPLOADTARGETLabel:this.UPLOADTARGETLabel,
      FEEDBACKTARGETLabel:this.FEEDBACKTARGETLabel,
      SMRTARGETLabel:this.SMRTARGETLabel,
      EMAILTARGETLabel:this.EMAILTARGETLabel,
      PSFTARGETLabel :this.PSFTARGETLabel,
      AchievementLabel:this.AchievementLabel,
      TargetVsAchievementServiceLoadLabel:this.TargetVsAchievementServiceLoadLabel,
      TargetVsAchievementInstantFeedbackLabel:this.TargetVsAchievementInstantFeedbackLabel,
      TargetVsAchievementSMRLabel:this.TargetVsAchievementSMRLabel,
      TargetVsAchievementEmailLabel:this.TargetVsAchievementEmailLabel,
      TargetVsAchievementPSFLabel:this.TargetVsAchievementPSFLabel,
      SERVICEDONELabel:this.SERVICEDONELabel,
      FeedbackCapturedLabel :this.FeedbackCapturedLabel,
      CSILabel:this.CSILabel,
      SATISFIEDLabel:this.SATISFIEDLabel,
      QuestionWiseRatingLabel:this.QuestionWiseRatingLabel,
      DISSATISFIEDLabel :this.DISSATISFIEDLabel,
      MonthwiseCustomerSatisfactionTrendLabel:this.MonthwiseCustomerSatisfactionTrendLabel,
      SURVEYSENTLabel:this.SURVEYSENTLabel,
      TELEPHONICSURVEYLabel:this.TELEPHONICSURVEYLabel,
      SURVEYCOMPLETEDLabel :this.SURVEYCOMPLETEDLabel,
      SatisfiedvsDissatisfiedCustomersLabel :this.SatisfiedvsDissatisfiedCustomersLabel,
      ServicecalldueLabel :this.ServicecalldueLabel,
      YETTOCONTACTLabel :this.YETTOCONTACTLabel,
      CONTACTEDLabel :this.CONTACTEDLabel,
      NONCONTACTABLELabel:this.NONCONTACTABLELabel,
      BOOKINGLabel:this.BOOKINGLabel,
      SERVICECONVERTEDLabel :this.SERVICECONVERTEDLabel,
      ServiceCallDueVsServiceDoneLabel:this.ServiceCallDueVsServiceDoneLabel,
      TOTALDUELabel :this.TOTALDUELabel,
      HighlySatisfiedLabel :this.HighlySatisfiedLabel,
      HighlyDissatisfiedLabel:this.HighlyDissatisfiedLabel,
      SurveysubmittedviaSMSLabel:this.SurveysubmittedviaSMSLabel,
      SurveysubmittedviaMailLabel :this.SurveysubmittedviaMailLabel,
      SurveysubmittedviaTelephonicLabel:this.SurveysubmittedviaTelephonicLabel,
    };
  }



  toggleDashboard(id: number) {
    let currentdate = new Date();
    let selectedDate = new Date(this.searchObj.ToDate);
    if (selectedDate.getFullYear() >= currentdate.getFullYear()) {
      if (selectedDate.getFullYear() > currentdate.getFullYear() || selectedDate.getMonth() >= currentdate.getMonth()) {
        if (selectedDate.getFullYear() > currentdate.getFullYear() || selectedDate.getMonth() > currentdate.getMonth()
          || (selectedDate.getDate() != 1 && selectedDate.getDate() >= currentdate.getDate())) {
          let lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate() - 1);
          this.searchObj.ToDate = this.datepipe.transform(lastDay, 'MMMM dd, yyyy')
        }
      }
    }
    if (this.searchObj.Leveldetail_Id === 0) {
      this.searchObj.Level_Id = this.levelObj[0].Level_Id;
    }
    console.log("searchObj in dashboard is",this.searchObj);
    this.rxService.sendToggleEvent({ id: id, obj: this.searchObj });
    if(id==1){
      this.Instant = true;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;
    }
    if (id == 2) {
      this.Instant = false;
      this.Survey = true;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;
    }
    if (id == 3) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = true;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;
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

  getLevelList(id: any) {
    if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
      this.searchObj.Level_Id = this.session.DealerId;
      this.searchObj.Leveldetail_Id = this.session.AccountId;

      this.apiService.getLevelListForZoneRegion(this.session.Country_Id, this.session.DealerId).subscribe
        ((data: any) => {
          this.levelObj = data;
          this.getLevelDetails(this.searchObj.Level_Id);
        }, err => {
          console.log(err);
        });
    }
    else {
      this.apiService.getLevelList(id).subscribe((data: any) => {
        this.levelObj = data;
        this.searchObj.Level_Id = this.levelObj[0].Level_Id;
        this.getLevelDetails(this.searchObj.Level_Id);
      }, err => {
        console.log(err);
      });
    }
  }

  getLevelDetails(levelId: any) {
    this.apiService.getLevelDetailListForZoneRegion(this.levelSearchObj).subscribe((data: any) => {
      this.levelDetail = data;

      if (this.session.RoleName === 'Zone/Region' || this.session.RoleName === 'LastLeg') {
        this.searchObj.Leveldetail_Id = this.session.AccountId;
      }
      else {
        this.searchObj.Leveldetail_Id = this.levelDetail[0].Leveldetail_Id;
      }

      this.getOutletListBySublevel();
    }, err => {
      console.log(err);
    })
  }

  getOutletListBySublevel() {
    this.outObj = {
      Level_Id: this.searchObj.Level_Id,
      Leveldetail_Id: this.searchObj.Leveldetail_Id,
      UserName: this.session.UserName,
      Country_Id: this.searchObj.Country_Id
    };

    this.apiService.getOutletListBySublevel(this.outObj).subscribe((data: any) => {
      this.outletObj = data;
      this.initDetails();
    }, err => {
      console.log(err);
    });
  }

}
