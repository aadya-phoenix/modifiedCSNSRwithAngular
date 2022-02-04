import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { StateReportComponent } from '../state-report/state-report.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-state-upload',
  templateUrl: './state-upload.component.html',
  styleUrls: ['./state-upload.component.css']
})
export class StateUploadComponent implements OnInit {

  myFile:any;
  reportDetails:any;
  session= this.constant.takeSession();

  constructor(
    private constant:ConstantsService,
   private stateservice:StateService,
   public dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  uploadFile(event:any){
    this.myFile = event.target.files[0];
  }

  upload(){
    const formdata = new FormData()  ;
    formdata.append('file',this.myFile);
    
    if(this.myFile){
      const obj = {
        User_Id: this.session.User_Id,
        AccountId: this.session.AccountId,
        DealerId: this.session.DealerId,
        RoleName: this.session.RoleName
         };
      formdata.append('data', JSON.stringify(obj));

      this.stateservice.uploadState(formdata).subscribe((data:any):any=>{
        this.reportDetails =data;
        if (this.reportDetails == 2){ 
          Swal.fire("Error ! Excel sheet not in the format");
          return false;
        }
        else if (this.reportDetails == 3) {
          Swal.fire("Error ! Header name in Excel sheet are different");
          return false;
          }
          else
          {
            this.cancel();
            this.dialog.open(StateReportComponent,{data:{obj:this.reportDetails}}); 
         }
      },err=>{
        console.log(err);
        Swal.fire("Error", err.data.ExceptionMessage, "error");
      });
    }
    else {
      Swal.fire("", "Please upload Attachment", "error");
  }
  }
  cancel(){}
}
