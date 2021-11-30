import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';
import { CountersDetail } from 'src/app/models/countersDetail.model';
import { Label } from 'src/app/models/label.model';
import { Search } from 'src/app/models/search.model';
import { DashboardApiService } from '../dashboard-services/dashboard-api.service';

@Component({
  selector: 'app-dashboard-graphs',
  templateUrl: './dashboard-graphs.component.html',
  styleUrls: ['./dashboard-graphs.component.css']
})
export class DashboardGraphsComponent implements OnInit {

  labelObj: Label[]=[];
  defaultLanguage: boolean = this.constantService.defaultLanguage;
  selectedLanguage: number = this.constantService.selectedLanguage;
  searchObj: Search = this.constantService.takeSearchObject();
  countersDtl!: CountersDetail;  

  myChart: any;
  myChart2: any;

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

  constructor(
    private constantService:ConstantsService,
    private dashapi:DashboardApiService,

  ) { }

  ngOnInit(): void {
    let obs: Observable<any> =this.dashapi.getLabel();
    obs.subscribe((data:any) => {
      console.log("label object data..",data);
      this.labelObj = data;
      this.selectLanguage(this.selectedLanguage);
      console.log("label object data.in .",this.labelObj);
    }, (err:any) => {
      console.log("label object error..", err);
    }
    );
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
  changeCountry(id: number) {

    if (id == 1) {
        //IFC
        this.dashapi.dashboard_bkCounters(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.countersDtl = data as CountersDetail;
                console.log("CountersDtl", this.countersDtl);
            }
        }, (error) => {
            console.log(error);
        });

        this.dashapi.instantSatisfactionTrend(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.InsSatisfactionObj = data;
            }
        }, (error) => {
            console.log(error);
        });

        //IFC
        this.dashapi.questionFeedbackReport(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.InsQuestionSatisfactionObj = data;
            }
        }, (error) => {
            console.log(error);
        });

        //IFC
       /*  this.dashapi.getDealerCSIForInstantFeedback(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.CSI = data;
            }

        }, (error) => {
            console.log(error);
        }); */

    };
    if (id == 2) {

        this.dashapi.surveyDashboard_bkCounters(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.countersDtl = data as CountersDetail;
                console.log("CountersDtl survey", this.countersDtl);
            }

        }, (error) => {
            console.log(error);
        });


        //Survey
        this.dashapi.getCustomerSatisfaction(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.SatisfactionObj = data;

            }

        }, (error) => {
            console.log(error);
        });

        //Survey
        this.dashapi.questionSurveyAvgScore(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.QuestionSatisfactionObj = data;
            }
        }, (error) => {
            console.log(error);
        });


        //Survey
        this.dashapi.dashboard_bkSurveyRatingAnalysis(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.RatingAnalysis = data;
            }

        }, (error) => {
            console.log(error);
        });


        //Survey
       /*  this.dashapi.getDealerCSIForSurvey(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.CSISurvey = data;
            }

        }, (error) => {
            console.log(error);
        }); */
    };
    if (id == 3) {
        //SMR
        this.myChart2.destroy();
       /*  this.dashapi.getSMRConvertedCountDashboard(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.ConvertedLeadCount = data;
                console.log("service due...aaya1");
            }

        }, (error) => {
            console.log(error);
        }); */


        //SMR
        /* this.dashapi.getFreshLeadCount(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.FreshLeadCount = data;
                console.log("service due...aaya2");
            }

        }, (error) => {
            console.log(error);
        }); */

        //SMR

      /*   this.dashapi.getFollowUpLeadCount(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.FollowUpLeadCount = data;
                console.log("service due...aaya3");
            }

        }, (error) => {
            console.log(error);
        }); */

        //SMR
        /* this.dashapi.getNonContactLeadCount(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.NonContactLeadCount = data;
                console.log("service due...aaya4");
            }

        }, (error) => {
            console.log(error);
        }); */

        //SMR
      /*   this.dashapi.getBookingLeadCount(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.BookingLeadCount = data;
                console.log("service due...aaya5");
            }

        }, (error) => {
            console.log(error);
        }); */


        //SMR
        if (this.appService.takeSession().RoleName == 'DealerAdmin') { this.searchObj.Country_Id = this.appService.takeSession().Country_Id; }

        this.dashapi.getServiceDueVsDoneForVehicle(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.ServiceDueObj = data;
                console.log("service due...aaya6");
            }

        }, (error) => {
            console.log(error);
        });

        //SMR
        this.dashapi.getServiceDue(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.ServiceDue = data;
                console.log("service due...aaya", this.ServiceDue);
                this.myChart2 = new Chart("myChart2", {
                    type: 'bar',
                    data: {
                        /*  labels: this.TGTData.TGTType, */
                        /* labels:['Regularity - Data Uplaod (%)','IFC (%)','SMR (%)','EMAIL (%)','PSF (%)'], */
                        labels: ['ServiceType'],
                        datasets: [{
                            label: 'Service Due',
                            data: this.ServiceDue,
                            backgroundColor: [
                                "#dd4b39"
                            ],

                            borderWidth: 1
                        }, {
                            label: 'Service Done',
                            data: "ServiceDone",
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

    };
    if (id == 4) {


        this.dashapi.PSFServiceDashboard_bkCounters(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.countersDtl = data as CountersDetail;
                console.log("CountersDtl", this.countersDtl);
            }

        }, (error) => {
            console.log(error);
        });

        //PSF
        //DashboardService.PSFSatisfactionTrend($scope.SerachObj).then(function (success) {
        //    if (success.data != null) {
        //        $scope.PSFSatisfactionObj = success.data;

        //    }

        //}, function (error) {
        //    console.log(error);
        //});


    };
    if (id == 6) {

        this.dashapi.PSFSalesDashboard_bkCounters(this.searchObj).subscribe((data) => {
            if (data != null) {
                this.countersDtl = data as CountersDetail;
                console.log("CountersDtl", this.countersDtl);
            }

        }, (error) => {
            console.log(error);
        });

    };
    if (id == 5) {
        console.log("inside graphs seatrch", this.searchObj);
        this.myChart.destroy();
        //CS&SRKPI
        this.dashapi.getTargetAchivement(this.searchObj).subscribe((data: any) => {
            if (data != null) {
                this.TGTData = data;
                console.log("TGTdata got", this.TGTData);
                this.TGTACH = [
                    {
                        'TGT': data.SerTarget,
                        'ACH': (data.SerAch * 100).toFixed(2),
                        'TGTType': 'Regularity - Data Uplaod (%)'

                    },
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
                var tgt = this.TGTACH.map((x: any) => x.TGT);
                console.log("tgt is", tgt);
                var ach = this.TGTACH.map((x: any) => x.ACH);
                console.log("ach is", ach);
                var tgtType = this.TGTACH.map((x: any) => x.TGTType);
                console.log("tgttype is", tgtType);

                console.log("tgt data is in change country is", this.TGTACH);
                this.myChart = new Chart("myChart", {
                    type: 'bar',
                    data: {
                        /*  labels: this.TGTData.TGTType, */
                        /* labels:['Regularity - Data Uplaod (%)','IFC (%)','SMR (%)','EMAIL (%)','PSF (%)'], */
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


            }

        }, (error) => {
            console.log(error);
        });

        this.AllMonth = _.cloneDeep(this.searchObj);
        this.AllMonth.FromDate = '';

        this.CurrntDate = new Date();
        this.Month = this.CurrntDate.getMonth() + 1;
        this.CurrntYear = this.CurrntDate.getFullYear();
        if (this.Month < 6) {

            this.NewMonth = 13 + (this.Month - 6);
            this.NewYear = this.CurrntYear - 1;

            this.Newdate = new Date(this.NewYear, this.NewMonth - 1, 1);

            this.Newdate = this.datePipe.transform(this.Newdate, 'dd-MMM-yyyy');
            console.log(this.Newdate);
            this.AllMonth.FromDate = this.Newdate;

        }
        if (this.Month >= 6) {

            this.NewMonth = 1 + (this.Month - 6);
            this.NewYear = this.CurrntYear;
            this.Newdate = new Date(this.NewYear, this.NewMonth - 1, 1);
            console.log(this.Newdate);

            this.AllMonth.FromDate = this.Newdate;
        }


        this.AllMonth.ToDate = this.datePipe.transform(this.searchObj.ToDate, 'dd-MMM-yyyy');


        //CS&SRKPI
        this.dashapi.getMonthWiseTargetAchivementForService(this.AllMonth).subscribe((data) => {
            if (data != null) {
                this.MNTHTGTData = data;

            }

        }, (error) => {
            console.log(error);
        });


        //CS&SRKPI
        this.dashapi.getMonthWiseTargetAchivementForIFC(this.AllMonth).subscribe((data) => {
            if (data != null) {
                this.IFC = data;

            }

        }, (error) => {
            console.log(error);
        });

        //CS&SRKPI
        this.dashapi.getMonthWiseTargetAchivementForSMR(this.AllMonth).subscribe((data) => {
            if (data != null) {
                this.SMRTGTList = data;

            }

        }, (error) => {
            console.log(error);
        });


        //CS&SRKPI
        this.dashapi.getMonthWiseTargetAchivementForEmail(this.AllMonth).subscribe((data) => {
            if (data != null) {
                this.Email = data;

            }

        }, (error) => {
            console.log(error);
        });

        //CS&SRKPI
        this.dashapi.getMonthWiseTargetAchivementForPSF(this.AllMonth).subscribe((data) => {
            if (data != null) {
                this.PSF = data;

            }

        }, (error) => {
            console.log(error);
        });


    };

}

toggleDashboard(id: number) {
  //this.dashapi.toggleDashboard(id);
  if (id == 1) {
      this.Instant = true;
      this.Survey = false;
      this.SMR = false;
      this.PSFS = false;
      this.PERF = false;
      this.PSFSales = false;


      this.dashapi.dashboard_bkCounters(this.searchObj).subscribe(data => {
          if (data != null) {
              this.countersDtl = data as CountersDetail;
              console.log("CountersDtl", this.countersDtl);
          }

      }, (error) => {
          console.log(error);
      });

      this.dashapi.instantSatisfactionTrend(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.InsSatisfactionObj = data;

          }
      }, (error) => {
          console.log(error);
      });

      this.dashapi.questionFeedbackReport(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.InsQuestionSatisfactionObj = data;
          }

      }, (error) => {
          console.log(error);
      });


      this.dashapi.getDealerCSIForInstantFeedback(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.CSI = data;
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


      this.dashapi.surveyDashboard_bkCounters(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.countersDtl = data as CountersDetail;
              console.log("CountersDtl", this.countersDtl);
          }

      }, (error) => {
          console.log(error);
      });

      this.dashapi.questionSurveyAvgScore(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.QuestionSatisfactionObj = data;
          }
      }, (error) => {
          console.log(error);
      });


      this.dashapi.dashboard_bkSurveyRatingAnalysis(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.RatingAnalysis = data;
          }

      }, (error) => {
          console.log(error);
      });

      this.dashapi.getDealerCSIForSurvey(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.CSISurvey = data;
              console.log("CSISurvey", this.CSISurvey);
          }

      }, (error) => {
          console.log(error);
      });

      //Survey
      this.dashapi.getCustomerSatisfaction(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.SatisfactionObj = data;
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
      this.dashapi.getFreshLeadCount(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.FreshLeadCount = data;
          }

      }, (error) => {
          console.log(error);
      });


      //SMR
      this.dashapi.getFollowUpLeadCount(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.FollowUpLeadCount = data;
          }

      }, (error) => {
          console.log(error);
      });

      //SMR
      this.dashapi.getNonContactLeadCount(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.NonContactLeadCount = data;
          }

      }, (error) => {
          console.log(error);
      });


      //SMR
      this.dashapi.getBookingLeadCount(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.BookingLeadCount = data;
          }

      }, (error) => {
          console.log(error);
      });



      //SMR
      if (this.session.RoleName == 'DealerAdmin') { this.searchObj.Country_Id = this.session.Country_Id; }
      this.dashapi.getServiceDueVsDoneForVehicle(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.ServiceDueObj = data;
          }

      }, (error) => {
          console.log(error);
      });

      //SMR
      this.dashapi.getSMRConvertedCountDashboard(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.ConvertedLeadCount = data;
          }

      }, (error) => {
          console.log(error);
      });
      //SMR
      this.dashapi.getServiceDue(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.ServiceDue = data;
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


      this.dashapi.PSFServiceDashboard_bkCounters(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.countersDtl = data as CountersDetail;
              console.log("CountersDtl", this.countersDtl);
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



      this.dashapi.PSFSalesDashboard_bkCounters(this.searchObj).subscribe((data) => {
          if (data != null) {
              this.countersDtl = data as CountersDetail;
              console.log("CountersDtl", this.countersDtl);
          }

      }, (error) => {
          console.log(error);
      });


  }

}

}
