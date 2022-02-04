import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Search } from 'src/app/models/search.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css']
})
export class CountersComponent implements OnInit {

  @Input()
  labelObj!: any;

  searchObj!:Search;
  selectedLanguage: number = this.constantService.selectedLanguage;
  defaultLanguage: boolean = true;
  totalComplaints:number=0;
  resolvedComplaint:number=0;
  pendingComplaints:number=0;
  distributorComplaints:number=0;
  customerComplaint: any[] = [] ;
  resultLabelObj:any;

 
  countrySubscription!:Subscription;
  
  constructor(
    private apiService: ApiService,
    private constantService:ConstantsService,
    private common:CommonService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.countrySubscription= this.common.getCountryEvent().subscribe(data=>{
      this.searchObj =data.obj;
      this.changeCountry();
      this. getComplaints();
    });
    
  }

  getComplaints(){
    this.searchObj.FromDate = this.datepipe.transform(this.searchObj.FromDate, 'MMMM dd, yyyy');
    this.searchObj.ToDate = this.datepipe.transform(this.searchObj.ToDate, 'MMMM dd, yyyy');
    this.apiService.customerComplaintDashBoardCounters(this.searchObj).subscribe((data:any)=>{
    
      this.totalComplaints = (data.IFC_Complaint + data.Survey_Complaint + 
        data.PSF_Complaint + data.Direct_Complaint + data.Distributer_Complaint);
         
        this.resolvedComplaint = (data.IFC_ComplaintResolved + data.Survey_ComplaintResolved + data.PSF_ComplaintResolved + data.Direct_ComplaintResolved + data.Distributer_ComplaintResolved);
       
        this.pendingComplaints = this.totalComplaints - this.resolvedComplaint;
                
        this.distributorComplaints = data.Distributer_Complaint;

    },error=>{
      console.log(error);
    });
  }

  changeCountry(){
   ("change country called..");
   this. getComplaints();
  }

}
