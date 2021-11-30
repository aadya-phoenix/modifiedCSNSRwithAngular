import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsConstantsService } from 'src/app/constants/analytics-constants.service';
import { Csi } from 'src/app/models/csi.model';
import { CsiSurvey } from 'src/app/models/csiSurvey.model';
import { DashboardCounters } from 'src/app/models/dashCounters.model';
import { SearchAnalytics } from 'src/app/models/searchAnalytics.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css']
})
export class CountersComponent implements OnInit {

  surveyTypeId: number = this.analyticService.surveyTypeId;
  searchObj: SearchAnalytics = this.analyticService.takeSearchObject();
  dashCountersDtl!: DashboardCounters;
  CSI!: Csi;
  CSISurvey!: CsiSurvey;

  Instant: boolean = false;
  Survey: boolean = true;

  countrySubscription!: Subscription;
  toggleSubscription!: Subscription;

  constructor(
    private analyticService: AnalyticsConstantsService,
    private apiService: ApiService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.countrySubscription = this.common.getCountryEvent().subscribe(data => {
      this.surveyTypeId = data.id;
      this.searchObj = data.obj;
      this.changeCountry();
    });
    this.toggleSubscription = this.common.getToggleEvent().subscribe(data => {
      this.surveyTypeId = data.id;
      this.searchObj = data.obj;
      this.toggleDashboard(data.id);
    })
  }

  toggleDashboard(id: number) {
    if (id == 1) {
      this.Instant = true;
      this.Survey = false;
      this.apiService.getDealerCSIForInstantFeedback(this.searchObj).subscribe((data) => {
        if (data != null) {
          console.log("data of CSI", data);
          this.CSI = data as Csi;
        }

      }, (error) => {
        console.log(error);
      });

    }
    else if (id == 2) {
      this.Instant = false;
      this.Survey = true;
    }
  }

  changeCountry() {
    if (this.surveyTypeId == 1) {
      this.apiService.dashboard_bkCounters(this.searchObj).subscribe(data => {
        this.dashCountersDtl = data as DashboardCounters;
      }, err => {
        console.log("instant counters error is..", err);
      });

      this.apiService.getDealerCSIForInstantFeedback(this.searchObj).subscribe(data => {
        this.CSI = data as Csi;
      }, err => {
        console.log("Csi Instant data error..", err);
      });
    }
    else if (this.surveyTypeId == 2) {
      this.apiService.surveyDashboard_bkCounters(this.searchObj).subscribe(data => {
        this.dashCountersDtl = data as DashboardCounters;
      }, err => {
        console.log("survey counters error is..", err);
      });

      this.apiService.getDealerCSIForSurvey(this.searchObj).subscribe((data: any) => {
        this.CSISurvey = data;
      }, err => {
        console.log("csi survey error..", err);
      });
    }
  }


}
