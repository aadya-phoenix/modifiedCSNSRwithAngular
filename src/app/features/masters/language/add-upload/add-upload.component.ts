import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import Swal from 'sweetalert2';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-add-upload',
  templateUrl: './add-upload.component.html',
  styleUrls: ['./add-upload.component.css']
})
export class AddUploadComponent implements OnInit {

    myFile:any;
    reportDetails:any;
    session = this.constant.takeSession();

  constructor(
    private constant:ConstantsService,
    private masters:MastersApiService,
    public dialog:MatDialog
    ) { }

  ngOnInit(): void {
  }

  uploadFile(event:any){
    this.myFile = event.target.files[0];
  }

  cancel(){}
   
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

      this.masters.uploadExcel(formdata).subscribe((data:any):any=>{
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
            //this.cancel();
            this.dialog.open(ReportComponent,{data:{obj:this.reportDetails}});
            
        }

      });
     }
  }

}
