import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { EmailSetupService } from './email-setup.service';
import { EmailSetupInfo } from './emailSetupInfo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-setup',
  templateUrl: './email-setup.component.html',
  styleUrls: ['./email-setup.component.css']
})
export class EmailSetupComponent implements OnInit {

  session = this.constant.takeSession();

  email!:EmailSetupInfo;

  constructor(
    private constant:ConstantsService,
   private emailSetupService:EmailSetupService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  updateEmailSetup():any{
    if (this.email.SMTPServer == null || this.email.SMTPServer == ''){
      Swal.fire('Please enter Server details');
      return false;
    }
    if (this.email.SMTPUsername == null || this.email.SMTPUsername == ''){
        Swal.fire('Please enter username details');
        return false;
    }
    if (this.email.SMTPPassword == null || this.email.SMTPPassword == ''){
        Swal.fire('Please enter password details');
        return false;
    }
    if (this.email.PortNumber == null || this.email.PortNumber == 0){
        Swal.fire('Please enter port number details');
        return false;
    }
    if (this.email.EnableSSL == null ) {
        Swal.fire('Please enter SSL details');
        return false;
    }
     this.email.AccountId = this.session.AccountId;
     this.email.DealerId= this.session.DealerId;
    
      this.emailSetupService.configureEmailSetup(this.email).subscribe((data:any)=>{
            if (data != null) {
              Swal.fire('success', data, 'success');
                this.init();
            }
          }, error => {
            console.log(error);
          });
  }

  init(){
    this.emailSetupService.getEmailSetup(this.session.AccountId, this.session.DealerId).subscribe((data:any)=>{
      this.email = data;
    }, error => {
      console.log(error);
    });
  }
}
