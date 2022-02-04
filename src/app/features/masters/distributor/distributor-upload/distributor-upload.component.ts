import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsService } from 'src/app/constants/constants.service';
import { DistributorService } from '../distributor.service';
import { DistributorReportComponent } from '../distributor-report/distributor-report.component';

@Component({
  selector: 'app-distributor-upload',
  templateUrl: './distributor-upload.component.html',
  styleUrls: ['./distributor-upload.component.css']
})
export class DistributorUploadComponent implements OnInit {
 
  myFile:any;
  session = this.constant.takeSession();
  reportDetails:any;
  
  constructor(
    private constant:ConstantsService,
    private distService:DistributorService,
    public dialog: MatDialog
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

      this.distService.uploadExcel(formdata).subscribe((data:any):any=>{
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
            this.dialog.open(DistributorReportComponent,{data:{obj:this.reportDetails}}); 
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

  
  cancel(){ }

}
