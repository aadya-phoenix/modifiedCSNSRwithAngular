import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Search } from 'src/app/models/search.model';
import { QuestionTrendInfo } from '../models/questionTrendInfo.model';
import { DashboardApiService } from '../services/dashboard-api.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-question-trend',
  templateUrl: './question-trend.component.html',
  styleUrls: ['./question-trend.component.css']
})
export class QuestionTrendComponent implements OnInit {
   
  QuestionTrendObj:QuestionTrendInfo[]=[];
  shareObj!:Search;
  myChart:any;

  constructor(@Inject(MAT_DIALOG_DATA)public data:any,
  private dashApi:DashboardApiService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.shareObj = this.data.obj;
    this.dashApi.questionFeedbackWiseTrend(this.shareObj).subscribe((data:any)=>{
          this.QuestionTrendObj = data;   
          for (let pt of this.QuestionTrendObj){
            var Months = pt.Info.map(x=>x.Month);
            var Avg = pt.Info.map(x=>x.Avg);
            this.myChart = new Chart("myChart", {
              type: 'bar',
              data: {
                labels: Months,
                datasets: [{
                  label: 'Avg. Rating',
                  data: Avg,
                  backgroundColor: [
                    "#4D4B79"
                  ],
                  borderWidth: 1
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
            this.myChart.destroy();
          }
          
   },(error)=>{
      console.log(error);
   });
  }

}
