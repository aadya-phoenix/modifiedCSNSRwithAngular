import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';
import { CountersDetail } from 'src/app/models/countersDetail.model';
import { Csi } from 'src/app/models/csi.model';
import { CsiSurvey } from 'src/app/models/csiSurvey.model';
import { Label } from 'src/app/models/label.model';
import { Search } from 'src/app/models/search.model';
import { TgtData } from 'src/app/models/tgtData.model';
import { ApiService } from '../../../services/api.service';
import { LabelService } from '../dashboard-services/label.service';
import { RxFunctionService } from '../dashboard-services/rx-function.service';

@Component({
  selector: 'app-dashboard-counters',
  templateUrl: './dashboard-counters.component.html',
  styleUrls: ['./dashboard-counters.component.css']
})
export class DashboardCountersComponent implements OnInit {

  labelObj: Label[] = [];
  defaultLanguage: boolean = this.constantService.defaultLanguage;
  selectedLanguage: number = this.constantService.selectedLanguage;
  searchObj: Search = this.constantService.takeSearchObject();
  countersDtl!: CountersDetail;
  CSI!: Csi;
  CSISurvey!: CsiSurvey;
  TGTData!: TgtData;

  FreshLeadCount: any;
  FollowUpLeadCount: any;
  NonContactLeadCount: any;
  BookingLeadCount: any;
  ConvertedLeadCount: any;


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

  Instant: boolean = false;
  Survey: boolean = false;
  SMR: boolean = false;
  PSFS: boolean = false;
  PERF: boolean = true;
  PSFSales: boolean = false;

  toggleEventSubscription: Subscription = new Subscription;
  changeCountrySubscription: Subscription = new Subscription;

  constructor(
    private labelService: LabelService,
    private apiService: ApiService,
    private constantService: ConstantsService,
    private rxService: RxFunctionService
  ) { }

  ngOnInit(): void {
    let obs: Observable<any> = this.apiService.getLabel();
    obs.subscribe((data: any) => {
      console.log("label object data..", data);
      this.labelObj = data;
      this.selectLanguage(this.selectedLanguage);
      console.log("label object data.in .", this.labelObj);
    }, (err: any) => {
      console.log("label object error..", err);
    }
    );
    /* this.labelService.getLabel();
    this.selectedLanguage(); */

    this.toggleEventSubscription = this.rxService.getToggleEvent().subscribe((data) => {
      this.searchObj = data.obj;
      this.toggleDashboard(data.id);
    });

    this.changeCountrySubscription = this.rxService.getChangeCountryEvent().subscribe((data) => {
      this.searchObj = data.obj;
      this.changeCountry(data.id);
    })
  }

  selectLanguage(id: number) {
    console.log("id is..", id);
    console.log("label object", this.labelObj);
    if (id == 2) {
      this.defaultLanguage = true;
      for (var i = 0; i < this.labelObj.length; i++) {
        if (this.labelObj[i].DefaultLanguage == '"CS+SR" - KPI') {
          this.CSSRKPILabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Country') {
          this.CountryLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Dealer Outlet Code') {
          this.DealerOutletCodeLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Switch To') {
          this.SwitchToLabel = this.labelObj[i].ConvertedLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Instant Feedback') {
          this.InstantFeedbackLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Survey Feedback') {
          this.SurveyFeedbackLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Service Reminders') {
          this.ServiceRemindersLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Survey Analysis') {
          this.SurveyAnalysisLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Post Service Follow-up') {
          this.PostServiceFollowupLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Post Sales Follow-up') {
          this.PostSalesFollowupLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'From Date') {
          this.FromDateLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'To Date') {
          this.ToDateLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Vehicle') {
          this.VehicleLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Search') {
          this.SearchLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement') {
          this.TargetVsAchievementLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'UPLOAD TARGET') {
          this.UPLOADTARGETLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'INSTANT FEEDBACK TARGET') {
          this.FEEDBACKTARGETLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'SERVICE REMINDER TARGET') {
          this.SMRTARGETLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'EMAIL TARGET') {
          this.EMAILTARGETLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'POST SERVICE FOLLOWUP TARGET') {
          this.PSFTARGETLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Achievement') {
          this.AchievementLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement - Service Load') {
          this.TargetVsAchievementServiceLoadLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement - Instant Feedback') {
          this.TargetVsAchievementInstantFeedbackLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement - Service Reminder') {
          this.TargetVsAchievementSMRLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement - Email') {
          this.TargetVsAchievementEmailLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement -Post Service Followup') {
          this.TargetVsAchievementPSFLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'SERVICE DONE') {
          this.SERVICEDONELabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Feedback Captured') {
          this.FeedbackCapturedLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'CSI') {
          this.CSILabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'SATISFIED') {
          this.SATISFIEDLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Question Wise Rating') {
          this.QuestionWiseRatingLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'DISSATISFIED') {
          this.DISSATISFIEDLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Month wise Customer Satisfaction Trend') {
          this.MonthwiseCustomerSatisfactionTrendLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'SURVEY SENT') {
          this.SURVEYSENTLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'TELEPHONIC SURVEY') {
          this.TELEPHONICSURVEYLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'SURVEY COMPLETED') {
          this.SURVEYCOMPLETEDLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Satisfied vs Dis-satisfied Customers') {
          this.SatisfiedvsDissatisfiedCustomersLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Service call due') {
          this.ServicecalldueLabel = this.labelObj[i].DefaultLanguage;
        } if (this.labelObj[i].DefaultLanguage == 'YET TO CONTACT') {
          this.YETTOCONTACTLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'CONTACTED') {
          this.CONTACTEDLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'NON CONTACTABLE') {
          this.NONCONTACTABLELabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'BOOKING') {
          this.BOOKINGLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'SERVICE CONVERTED') {
          this.SERVICECONVERTEDLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Service Call Due Vs Service Done') {
          this.ServiceCallDueVsServiceDoneLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'TOTAL DUE') {
          this.TOTALDUELabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Highly Satisfied') {
          this.HighlySatisfiedLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Highly Dissatisfied') {
          this.HighlyDissatisfiedLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Survey submitted via SMS') {
          this.SurveysubmittedviaSMSLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Survey submitted via Mail') {
          this.SurveysubmittedviaMailLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'Survey submitted via Telephonic') {
          this.SurveysubmittedviaTelephonicLabel = this.labelObj[i].DefaultLanguage;
        }
        if (this.labelObj[i].DefaultLanguage == 'SURVEY COMPLETED') {
          this.SURVEYCOMPLETEDLabel = this.labelObj[i].DefaultLanguage;
        }
      }
    }

    if (id > 2) {
      this.defaultLanguage = false;
      for (var i = 0; i < this.labelObj.length; i++) {
        if (this.labelObj[i].Language_Id == id) {
          if (this.labelObj[i].DefaultLanguage == '"CS+SR" - KPI') {
            this.CSSRKPILabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Switch To') {
            this.SwitchToLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Instant Feedback') {
            this.InstantFeedbackLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Survey Feedback') {
            this.SurveyFeedbackLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Service Reminders') {
            this.ServiceRemindersLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Survey Analysis') {
            this.SurveyAnalysisLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Post Service Follow-up') {
            this.PostServiceFollowupLabel = this.labelObj[i].DefaultLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Post Sales Follow-up') {
            this.PostSalesFollowupLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'From Date') {
            this.FromDateLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'To Date') {
            this.ToDateLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Vehicle') {
            this.VehicleLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Search') {
            this.SearchLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement') {
            this.TargetVsAchievementLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'UPLOAD TARGET') {
            this.UPLOADTARGETLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'INSTANT FEEDBACK TARGET') {
            this.FEEDBACKTARGETLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'SERVICE REMINDER TARGET') {
            this.SMRTARGETLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'EMAIL TARGET') {
            this.EMAILTARGETLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'POST SERVICE FOLLOWUP TARGET') {
            this.PSFTARGETLabel = this.labelObj[i].ConvertedLanguage;
          } if (this.labelObj[i].DefaultLanguage == 'Achievement') {
            this.AchievementLabel = this.labelObj[i].ConvertedLanguage;
          }

          if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement - Service Load') {
            this.TargetVsAchievementServiceLoadLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement - Instant Feedback') {
            this.TargetVsAchievementInstantFeedbackLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement - Service Reminder') {
            this.TargetVsAchievementSMRLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement - Email') {
            this.TargetVsAchievementEmailLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Target Vs Achievement -Post Service Followup') {
            this.TargetVsAchievementPSFLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'SERVICE DONE') {
            this.SERVICEDONELabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Feedback Captured') {
            this.FeedbackCapturedLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'CSI') {
            this.CSILabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'SATISFIED') {
            this.SATISFIEDLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Question Wise Rating') {
            this.QuestionWiseRatingLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'DISSATISFIED') {
            this.DISSATISFIEDLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Month wise Customer Satisfaction Trend') {
            this.MonthwiseCustomerSatisfactionTrendLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'SURVEY SENT') {
            this.SURVEYSENTLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'TELEPHONIC SURVEY') {
            this.TELEPHONICSURVEYLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'SURVEY COMPLETED') {
            this.SURVEYCOMPLETEDLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Satisfied vs Dis-satisfied Customers') {
            this.SatisfiedvsDissatisfiedCustomersLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Service call due') {
            this.ServicecalldueLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'YET TO CONTACT') {
            this.YETTOCONTACTLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'CONTACTED') {
            this.CONTACTEDLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'NON CONTACTABLE') {
            this.NONCONTACTABLELabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'BOOKING') {
            this.BOOKINGLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'SERVICE CONVERTED') {
            this.SERVICECONVERTEDLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Service Call Due Vs Service Done') {
            this.ServiceCallDueVsServiceDoneLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'TOTAL DUE') {
            this.TOTALDUELabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Highly Satisfied') {
            this.HighlySatisfiedLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Highly Dissatisfied') {
            this.HighlyDissatisfiedLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Survey submitted via SMS') {
            this.SurveysubmittedviaSMSLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Survey submitted via Mail') {
            this.SurveysubmittedviaMailLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Survey submitted via Telephonic') {
            this.SurveysubmittedviaTelephonicLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'SURVEY COMPLETED') {
            this.SURVEYCOMPLETEDLabel = this.labelObj[i].ConvertedLanguage;
          }
          if (this.labelObj[i].DefaultLanguage == 'Country') {
            this.CountryLabel = this.labelObj[i].ConvertedLanguage;
          }

          if (this.labelObj[i].DefaultLanguage == 'Dealer Outlet Code') {
            this.DealerOutletCodeLabel = this.labelObj[i].ConvertedLanguage;
          }
        }
      }
    }
  }

  toggleDashboard(id: number) {

    if (id == 1) {
      this.Instant = true;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;


      this.apiService.dashboard_bkCounters(this.searchObj).subscribe(data => {
        if (data != null) {

          this.countersDtl = data as CountersDetail;
          console.log("CountersDtl5", this.countersDtl);
        }

      }, (error) => {
        console.log(error);
      });



      this.apiService.getDealerCSIForInstantFeedback(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.CSI = data as Csi;
          console.log("CSI.2.", this.CSI);
        }

      }, (error) => {
        console.log(error);
      });

    }
    else if (id == 2) {
      this.Instant = false;
      this.Survey = true;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;


      this.apiService.surveyDashboard_bkCounters(this.searchObj).subscribe((data) => {
        if (data != null) {

          this.countersDtl = data as CountersDetail;
          console.log("CountersDtl6", this.countersDtl);
        }

      }, (error) => {
        console.log(error);
      });



      this.apiService.getDealerCSIForSurvey(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.CSISurvey = data as CsiSurvey;
          console.log("CSISurvey2", this.CSISurvey);
        }

      }, (error) => {
        console.log(error);
      });



    }
    else if (id == 3) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = true;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;


      //SMR
      this.apiService.getFreshLeadCount(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.FreshLeadCount = data;
          console.log("freshleadcountobject2..", this.FreshLeadCount);
        }

      }, (error) => {
        console.log(error);
      });


      //SMR
      this.apiService.getFollowUpLeadCount(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.FollowUpLeadCount = data;
          console.log("FollowUpLeadCount2", this.FollowUpLeadCount);

        }

      }, (error) => {
        console.log(error);
      });

      //SMR
      this.apiService.getNonContactLeadCount(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.NonContactLeadCount = data;
          console.log("NonContactLeadCount2..", this.NonContactLeadCount);
        }

      }, (error) => {
        console.log(error);
      });


      //SMR
      this.apiService.getBookingLeadCount(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.BookingLeadCount = data;
          console.log("BookingLeadCount..2..", this.BookingLeadCount);
        }

      }, (error) => {
        console.log(error);
      });


      //SMR
      this.apiService.getSMRConvertedCountDashboard(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.ConvertedLeadCount = data;
          console.log("ConvertedLeadCount.2.", this.ConvertedLeadCount);
        }

      }, (error) => {
        console.log(error);
      });

    }
    else if (id == 4) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = true;
      this.PERF = false;
      this.PSFSales = false;


      this.apiService.PSFServiceDashboard_bkCounters(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.countersDtl = data as CountersDetail;
          console.log("CountersDtl7", this.countersDtl);
        }

      }, (error) => {
        console.log(error);
      });


    }
    else if (id == 5) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = true;
      this.PSFSales = false;
    }
    else if (id == 6) {
      this.Instant = false;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = true;



      this.apiService.PSFSalesDashboard_bkCounters(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.countersDtl = data as CountersDetail;
          console.log("CountersDtl8", this.countersDtl);
        }

      }, (error) => {
        console.log(error);
      });


    }

  }
  changeCountry(id: number) {

    if (id == 1) {
      //IFC
      console.log("inside change country", id);
      this.apiService.dashboard_bkCounters(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.countersDtl = data as CountersDetail;
          console.log("CountersDtl1", this.countersDtl);
        }
      }, (error) => {
        console.log(error);
      });



      //IFC
      this.apiService.getDealerCSIForInstantFeedback(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.CSI = data as Csi;
          console.log("CSI..", this.CSI);
        }

      }, (error) => {
        console.log(error);
      });

    };
    if (id == 2) {
      console.log("inside change country", id);
      this.apiService.surveyDashboard_bkCounters(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.countersDtl = data as CountersDetail;
          console.log("CountersDtl survey2", this.countersDtl);
        }

      }, (error) => {
        console.log(error);
      });


      //Survey
      this.apiService.getDealerCSIForSurvey(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.CSISurvey = data as CsiSurvey;
          console.log("CSISurvey1", this.CSISurvey);
        }

      }, (error) => {
        console.log(error);
      });
    };
    if (id == 3) {
      //SMR
      console.log("inside change country", id);
      this.apiService.getSMRConvertedCountDashboard(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.ConvertedLeadCount = data;
          console.log("ConvertedLeadCount..", this.ConvertedLeadCount);
        }

      }, (error) => {
        console.log(error);
      });


      //SMR
      this.apiService.getFreshLeadCount(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.FreshLeadCount = data;
          console.log("freshleadcountobject..", this.FreshLeadCount);
        }

      }, (error) => {
        console.log(error);
      });

      //SMR

      this.apiService.getFollowUpLeadCount(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.FollowUpLeadCount = data;
          console.log("FollowUpLeadCount", this.FollowUpLeadCount);
        }

      }, (error) => {
        console.log(error);
      });

      //SMR
      this.apiService.getNonContactLeadCount(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.NonContactLeadCount = data;
          console.log("NonContactLeadCount..", this.NonContactLeadCount);
        }

      }, (error) => {
        console.log(error);
      });

      //SMR
      this.apiService.getBookingLeadCount(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.BookingLeadCount = data;
          console.log("BookingLeadCount", this.BookingLeadCount);
        }

      }, (error) => {
        console.log(error);
      });

    };
    if (id == 4) {
      console.log("inside change country", id);

      this.apiService.PSFServiceDashboard_bkCounters(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.countersDtl = data as CountersDetail;
          console.log("CountersDtl3", this.countersDtl);
        }

      }, (error) => {
        console.log(error);
      });

    };
    if (id == 6) {
      console.log("inside change country", id);
      this.apiService.PSFSalesDashboard_bkCounters(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.countersDtl = data as CountersDetail;
          console.log("CountersDtl4", this.countersDtl);
        }

      }, (error) => {
        console.log(error);
      });

    };
    if (id == 5) {

      //CS&SRKPI
      this.apiService.getTargetAchivement(this.searchObj).subscribe((data) => {
        if (data != null) {
          this.TGTData = data as TgtData;
          console.log("TGTdata izzz", this.TGTData);
        }

      }, (error) => {
        console.log(error);
      });

    };

  }
}
