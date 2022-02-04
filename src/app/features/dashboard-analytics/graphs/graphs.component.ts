import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
    selector: 'app-graphs',
    templateUrl: './graphs.component.html',
    styleUrls: ['./graphs.component.css']
  })
  export class GraphsComponent implements OnInit {

    myChart: any;
    AvgScore:any;
    QuestionSD:any;

      constructor(){
        Chart.register(...registerables);
      }

      ngOnInit(): void {
          var Type;
          var CMP;
          var RES;

        this.myChart = new Chart("myChart", {
            type: 'bar',
            data: {
              labels: Type,
              datasets: [{
                label: 'Top Weak Areas',
                data: CMP,
                backgroundColor: [
                  "#dd4b39"
                ],
                borderWidth: 1
              }, {
                label: '',
                data: RES,
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

          this.AvgScore = new Chart("AvgScore", {
            type: 'bar',
            data: {
              labels: Type,
              datasets: [{
               
                data: CMP,
                backgroundColor: [
                  
                ],
                borderWidth: 1
              }, {
                label: '',
                data: RES,
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

          this.QuestionSD = new Chart("QuestionSD", {
            type: 'bar',
            data: {
              labels: Type,
              datasets: [{
                label: '',
                data: CMP,
                backgroundColor: [
                  "#dd4b39"
                ],
                borderWidth: 1
              }, {
                label: '',
                data: RES,
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
  }