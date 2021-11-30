import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectLanguageService {
 
    appUrl="";
  constructor(
    private http:HttpClient,
    
   public CSSRKPILabel: string = '',
   public CountryLabel: string = '',
   public DealerOutletCodeLabel: string = '',
   public SwitchToLabel: string = '',
   public InstantFeedbackLabel: string = '',
   public SurveyFeedbackLabel: string = '',
   public ServiceRemindersLabel: string = '',
   public SurveyAnalysisLabel: string = '',
   public PostServiceFollowupLabel: string = '',
   public PostSalesFollowupLabel: string = '',
   public FromDateLabel: string = '',
   public ToDateLabel: string = '',
   public VehicleLabel: string = '',
   public SearchLabel: string = '',
   public TargetVsAchievementLabel: string = '',
   public FEEDBACKTARGETLabel: string = '',
   public SMRTARGETLabel: string = '',
   public UPLOADTARGETLabel: string = '',
   public EMAILTARGETLabel: string = '',
   public PSFTARGETLabel: string = '',
   public AchievementLabel: string = '',
   public TargetVsAchievementServiceLoadLabel: string = '',
   public TargetVsAchievementInstantFeedbackLabel: string = '',
   public TargetVsAchievementSMRLabel: string = '',
   public TargetVsAchievementEmailLabel: string = '',
   public TargetVsAchievementPSFLabel: string = '',
   public SERVICEDONELabel: string = '',
   public FeedbackCapturedLabel: string = '',
   public CSILabel: string = '',
   public SATISFIEDLabel: string = '',
   public QuestionWiseRatingLabel: string = '',
   public DISSATISFIEDLabel: string = '',
   public MonthwiseCustomerSatisfactionTrendLabel: string = '',
   public SURVEYSENTLabel: string = '',
   public TELEPHONICSURVEYLabel: string = '',
   public SURVEYCOMPLETEDLabel: string = '',
   public SatisfiedvsDissatisfiedCustomersLabel: string = '',
   public ServicecalldueLabel: string = '',
   public YETTOCONTACTLabel: string = '',
   public CONTACTEDLabel: string = '',
   public NONCONTACTABLELabel: string = '',
   public BOOKINGLabel: string = '',
   public SERVICECONVERTEDLabel: string = '',
   public ServiceCallDueVsServiceDoneLabel: string = '',
   public TOTALDUELabel: string = '',
   public HighlySatisfiedLabel: string = '',
   public HighlyDissatisfiedLabel: string = '',
   public SurveysubmittedviaSMSLabel: string = '',
   public SurveysubmittedviaMailLabel: string = '',
   public SurveysubmittedviaTelephonicLabel: string = '',
  ) { }


  getLabel():Observable<any>{
    return this.http.get(this.appUrl + 'Label/GetLabelConvertedLanguage');
  }


  }