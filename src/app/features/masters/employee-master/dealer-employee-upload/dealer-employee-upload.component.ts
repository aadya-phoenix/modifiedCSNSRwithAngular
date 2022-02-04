import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonApiService } from '../../services/common-api.service';
import Swal from 'sweetalert2';
import { EmployeeReportComponent } from '../employee-report/employee-report.component';


@Component({
  selector: 'app-dealer-employee-upload',
  templateUrl: './dealer-employee-upload.component.html',
  styleUrls: ['./dealer-employee-upload.component.css']
})
export class DealerEmployeeUploadComponent implements OnInit {

 myFile:any;
 reportDetails:number=0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog:MatDialog,
    private commonApi:CommonApiService
  ) { }

  ngOnInit(): void {
  }
 
  uploadFile(event:any){
    this.myFile = event.target.file[0];
  }

  upload(){
   const formData = new FormData();
   formData.append('file',this.myFile);

   if (this.myFile) {
    const obj = {
        User_Id: this.data.session.User_Id,
        AccountId: this.data.session.AccountId,
        Country_Id: this.data.countryId // Country_id of Employees being uploaded
    };
 
    formData.append('data',JSON.stringify(obj));
   
    this.commonApi.uploadExcelEmployee(formData).subscribe((data:any):any=>{
       this.reportDetails = data; 

       if (this.reportDetails == 2) {
        Swal.fire("Error ! Excel sheet not in the format");
        console.log("Error! Excel sheet not in the format");
        return false;
      }
      else if (this.reportDetails == 3) {
        Swal.fire("Error ! Header name in Excel sheet are different");
        console.log("Error! Header name in Excel sheet are different ");
        return false;
      }
      else {
        this.dialog.open(EmployeeReportComponent);
        this.cancel();
    }
    },err=>{
      console.log(err);
    });
  }
  }
  cancel(){}
}
