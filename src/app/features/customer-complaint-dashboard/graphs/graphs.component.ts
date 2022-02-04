import { Component, Input, OnInit } from '@angular/core';
import { Search } from 'src/app/models/search.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../services/common.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { CcDashService } from '../services/cc-dash.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  @Input()
  labelObj!: any;
  myChart: any;
  myChartPie:any;
  searchObj= this.constantService.takeSearchAnalytics();
  selectedLanguage: number = this.constantService.selectedLanguage;
  defaultLanguage: boolean = true;

  ModeWisecount:any;

  countrySubscription!:Subscription;

  constructor(
    private apiService: ApiService,
    private constantService:ConstantsService,
    private common:CommonService,
    private ccDash:CcDashService,
    private datepipe: DatePipe
  ) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.countrySubscription= this.common.getCountryEvent().subscribe(data=>{
      this.searchObj =data.obj;
      this.changeCountry();
    });
     this.getGraphData();
  }

  changeCountry(){

    
    this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
    this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');
    

    this.apiService.customerComplaintDashBoardCounters(this.searchObj).subscribe((data:any)=>{
      console.log("change country api graphs");
      
      const totalComplaints = (data.IFC_Complaint + data.Survey_Complaint + 
        data.PSF_Complaint + data.Direct_Complaint + data.Distributer_Complaint);
         
      const resolvedComplaint = (data.IFC_ComplaintResolved + data.Survey_ComplaintResolved 
        + data.PSF_ComplaintResolved + data.Direct_ComplaintResolved + data.Distributer_ComplaintResolved);
       
      const CMP = [totalComplaints,data.IFC_Complaint,data.Survey_Complaint,
              data.Direct_Complaint,data.PSF_Complaint,data.Distributer_Complaint];
      
      const RES = [resolvedComplaint,data.IFC_ComplaintResolved,data.Survey_ComplaintResolved,
                  data.Direct_ComplaintResolved,data.PSF_ComplaintResolved,data.Distributer_ComplaintResolved];

      const Type =['Total','IFCSurvey','Direct','PSF','Distributor'];
      this.myChart.destroy();
         this.myChart = new Chart("myChart", {
           type: 'bar',
           data: {
             labels: Type,
             datasets: [{
               label: 'Total',
               data: CMP,
               backgroundColor: [
                 "#dd4b39"
               ],
               borderWidth: 1
             }, {
               label: 'Resolved',
               data: RES,
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
      
    },error=>{
      console.log(error);
    });

    this.ccDash.customerComplaintDashBoardCountersModewise(this.searchObj).subscribe(data=>{
      this.ModeWisecount =data;
      console.log("ModeWisecount",this.ModeWisecount);
      console.log("search object",this.searchObj);
    },err=>{
      console.log(err);
    });

    this.ccDash.getComplaintCategoryCountForDashBoard(this.searchObj).subscribe((data:any)=>{

      const PieLabels = data.map((x:any)=>x.CmplnAttribute);

      const totalAttributecount = data.map((x:any)=>x.TotalCount);

      const PieData =  data.map((x:any)=>((x.TotalCount/x.totalAttributecount) * 100).toFixed(2));

      this.myChart = new Chart("pie", {
        type: 'pie',
        data: {
          labels: PieLabels,
          datasets: [{
            data: PieData,
            backgroundColor: [
              "#dd4b39"
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

    },err=>{
      console.log(err);
    });
    
  }

  getGraphData(){

    this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
    this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');
    this.apiService.customerComplaintDashBoardCounters(this.searchObj).subscribe((data:any)=>{
         
      console.log("get graphs callbackify..");

      const totalComplaints = (data.IFC_Complaint + data.Survey_Complaint + 
        data.PSF_Complaint + data.Direct_Complaint + data.Distributer_Complaint);
         
      const resolvedComplaint = (data.IFC_ComplaintResolved + data.Survey_ComplaintResolved 
        + data.PSF_ComplaintResolved + data.Direct_ComplaintResolved + data.Distributer_ComplaintResolved);
       
      const CMP = [totalComplaints,data.IFC_Complaint,data.Survey_Complaint,
              data.Direct_Complaint,data.PSF_Complaint,data.Distributer_Complaint];
      
      const RES = [resolvedComplaint,data.IFC_ComplaintResolved,data.Survey_ComplaintResolved,
                  data.Direct_ComplaintResolved,data.PSF_ComplaintResolved,data.Distributer_ComplaintResolved];

      const Type =['Total','IFCSurvey','Direct','PSF','Distributor'];

         this.myChart = new Chart("myChart", {
           type: 'bar',
           data: {
             labels: Type,
             datasets: [{
               label: 'Total',
               data: CMP,
               backgroundColor: [
                 "#dd4b39"
               ],
               borderWidth: 1
             }, {
               label: 'Resolved',
               data: RES,
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

    },error=>{
      console.log(error);
    });

    this.ccDash.customerComplaintDashBoardCountersModewise(this.searchObj).subscribe(data=>{
      this.ModeWisecount =data;
    },err=>{
      console.log(err);
    });

    this.ccDash.getComplaintCategoryCountForDashBoard(this.searchObj).subscribe((data:any)=>{

      const PieLabels = data.map((x:any)=>x.CmplnAttribute);

      const totalAttributecount = data.map((x:any)=>x.TotalCount);

      const PieData =  data.map((x:any)=>((x.TotalCount/x.totalAttributecount) * 100).toFixed(2));

      this.myChartPie = new Chart("pie", {
        type: 'pie',
        data: {
          labels: PieLabels,
          datasets: [{
            data: PieData,
            backgroundColor: [
              "#dd4b39"
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

    },err=>{
      console.log(err);
    });
  }

}
