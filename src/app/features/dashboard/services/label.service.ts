import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  appUrl = "http://localhost:52268/api/";
  labelObj: Label[]=[];
  selectedLanguage: number = this.constantService.selectedLanguage;
  defaultLanguage: boolean = this.constantService.defaultLanguage;

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
    private http:HttpClient,
    private constantService:ConstantsService
  ) { }
  getLabel(){
  
   let obs: Observable<any> = this.http.get(this.appUrl + 'Label/GetLabelConvertedLanguage');
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


}
