import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import Swal from 'sweetalert2';
import { CountryReportComponent } from '../country-report/country-report.component';

@Component({
  selector: 'app-country-upload',
  templateUrl: './country-upload.component.html',
  styleUrls: ['./country-upload.component.css']
})
export class CountryUploadComponent implements OnInit {

  myFile :any;
  session = this.constant.takeSession();

  reportDetails:any;

  constructor(
    private constant:ConstantsService,
    private master:MastersApiService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }
  uploadFile(event:any){
    this.myFile = event.target.files[0];
  }

  upload(){
    const fd = new FormData();
    fd.append('file',this.myFile);
    const obj = {
      User_Id: this.session.User_Id,
      AccountId: this.session.AccountId,
      DealerId: this.session.DealerId,
      RoleName: this.session.RoleName
       };

     fd.append('data', JSON.stringify(obj));

     this.master.uploadCountryExcel(fd).subscribe((data:any):any=>{
      this.reportDetails = data;

      if (this.reportDetails == 2){
        Swal.fire("Error ! Excel sheet not in the format");
        console.log("Error! Excel sheet not in the format");
        return false;

    }
    else if (this.reportDetails == 3){
        Swal.fire("Error ! Header name in Excel sheet are different");
        console.log("Error! Header name in Excel sheet are different ");
        return false;

    }
    else {
      this.dialog.open(CountryReportComponent,{});
    }
     })
  }

  cancel(){}

}
