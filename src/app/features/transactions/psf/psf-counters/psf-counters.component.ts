import { Component, Input, OnInit } from '@angular/core';
import { Search } from 'src/app/models/search.model';
import { PsfService } from '../services/psf.service';
import * as XLSX  from 'xlsx';
import { PsfRxService } from '../services/psf-rx.service';
import { CustomerSMRInfo } from '../../models/customerSMRInfo.model';

@Component({
  selector: 'app-psf-counters',
  templateUrl: './psf-counters.component.html',
  styleUrls: ['./psf-counters.component.css']
})
export class PsfCountersComponent implements OnInit {

  @Input()
  labelObj!:any;

  @Input()
  searchObj!:Search;

  freshLead:CustomerSMRInfo[]=[];
  pendingLead:CustomerSMRInfo[]=[];

  S1:boolean=true;
  S2:boolean=false;
  S3:boolean=false;
  S4:boolean=false;
  S5:boolean=false;

  view1:boolean=true;
  view2:boolean=false;
  view3:boolean=false;
  view4:boolean=false;
  view5:boolean=false;
  view6:boolean=false;
  
  searchText:string='';
  searchCategory:string='';
  pendingSearch:string='';
  curr:string='';
  SePendingSearch:string='';

 // searchObj!:Search;
  pendingSearchObj!:Search;

  freshLeadCount:number=0;
  freshFollowUp:number=0;
  freshNonContacted:number=0;
  pendingLeadCount:number=0;
  pendingFollowUp:number=0;
  pendingNonContacted:number=0;

  fileName:string='download.xls';

  constructor(
    private psfService:PsfService,
    private rx:PsfRxService,
    ) { }

  ngOnInit(): void {
    this.rx.getCurrentView().subscribe(data=>{
     this.curr = data.txt;
     this.searchObj = data.searchObj;
     this.pendingSearchObj= data.pendingObj;
     this.getCurrentWindow(this.curr);
    });
    this.getFormDetails();
  }
  getFormDetails(){
    //FreshLeadCount
    this.psfService.getFreshLeadCount(this.searchObj).subscribe((data:any)=>{
      console.log("search object",this.searchObj)
      if (data != null) {
          this.freshLeadCount = data;
        }
      },(error)=>{
       console.log(error);
    });
    //FreshFollowUp
    this.psfService.getFollowUpSMRLead(this.searchObj).subscribe((data:any)=>{
      if (data != null) {
          this.freshFollowUp = data;
        }
      },(error)=>{
       console.log(error);
    });
    //FreshNonContacted
    this.psfService.getNonContactedFollowUpSMRLead(this.searchObj).subscribe((data:any)=>{
      if (data != null) {
          this.freshNonContacted = data;
        }
      },(error)=>{
       console.log(error);
    });
     //Fresh Leads
     this.psfService.getFreshSMRLead(this.searchObj).subscribe((data:any)=>{
      if (data != null){
          this.freshLead = data;
       }
      },(error)=>{
      console.log(error);
     });
  }
  export(tableId:string){
    const element = document.getElementById(tableId);

    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,this.fileName)
  }

  getCurrentWindow(curr:string){
    if (curr == 'S1') {
      this.S1 = true;
      this.S2 = false;
      this.S3 = false;
      this.S4 = false;
      this.S5 = false;
     //Fresh Leads
     this.psfService.getFreshSMRLead(this.searchObj).subscribe((data:any)=>{
      if (data != null){
          this.freshLead = data;
      }
     },(error)=>{
      console.log(error);
    });
       //FreshLeadCount
    this.psfService.getFreshLeadCount(this.searchObj).subscribe((data:any)=>{
      if (data != null) {
          this.freshLeadCount = data;
        }
      },(error)=>{
       console.log(error);
    });
     //FreshFollowUp
    this.psfService.getFollowUpSMRLead(this.searchObj).subscribe((data:any)=>{
      if (data != null) {
          this.freshFollowUp = data;
        }
      },(error)=>{
       console.log(error);
    });
     //FreshNonContacted
    this.psfService.getNonContactedFollowUpSMRLead(this.searchObj).subscribe((data:any)=>{
      if (data != null) {
          this.freshNonContacted = data;
        }
      },(error)=>{
       console.log(error);
    });
     }
    else if (curr == 'S2') {
      this.S1 = false;
      this.S2 = true;
      this.S3 = false;
      this.S4 = false;
      this.S5 = false;
//pendingLead
      this.psfService.getPendingSMRLead(this.pendingSearchObj).subscribe((data:any)=>{
        if(data != null) {
            this.pendingLead = data;
        }
      },(error)=>{
        console.log(error);
     });
//PendingLeadCount
      this.psfService.getFreshLeadCount(this.pendingSearchObj).subscribe((data:any)=>{
          if (data != null) {
              this.pendingLeadCount = data;
            }
          },(error)=>{
            console.log(error);
         });
//PendingFollowUpSMRLead
         this.psfService.getFollowUpSMRLead(this.pendingSearchObj).subscribe((data:any)=>{
          if (data != null) {
              this.pendingFollowUp = data;
            }
           },(error)=>{
              console.log(error);
           });
  //PendingNonContactedFollowUpSMRLead
          this.psfService.getNonContactedFollowUpSMRLead(this.pendingSearchObj).subscribe((data:any)=>{
          if (data != null) {
              this.pendingNonContacted = data;
            }
          },(error)=>{
            console.log(error);
         });

     }
    else if (curr == 'S3') {
         this.S1 = false;
         this.S2 = false;
         this.S3 = true;
         this.S4 = false;
         this.S5 = false;
   
     }
     else if (curr == 'S4') {
         this.S1 = false;
         this.S2 = false;
         this.S3 = false;
         this.S4 = true;
         this.S5 = false;
   
     }
    else if (curr == 'S5') {
        this.S1 = false;
        this.S2 = false;
        this.S3 = false;
        this.S4 = false;
        this.S5 = true;  
     }
     this.view1 = true;
     this.view2 = false;
     this.view3 = false;
     this.view4 = false;
     this.view5 = false;
     this.view6 = false;
  }

  filterData(txt:string){
    console.log("a tag clicked",txt); 
    this.searchCategory=txt;
  }
  filterPendingData(txt:string){

  }
  filterFn():any{
    // Do some tests
    console.log("fn called");
    /* if (this.searchCategory != '') {
        if (pt.LeadCategory == this.searchCategory) {
            return true; // this will be listed in the results
        }
    }
    else {
        return true;
    } */
    // return false; // otherwise it won't be within the results
  }
  searchPending(){

  }
  openSMRView(view:string,custId:number,detailId:number,logId:number,serviceTypeId:number){
    this.rx.sendSmrSubject({curr:view,custId:custId,detailId:detailId,logId:logId,serviceTypeId:serviceTypeId});
  }
}
