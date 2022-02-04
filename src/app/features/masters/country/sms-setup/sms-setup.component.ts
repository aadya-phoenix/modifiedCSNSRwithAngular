import { Component, Inject, OnInit } from '@angular/core';
import { CommonApiService } from '../../services/common-api.service';
import { ConstantsService } from 'src/app/constants/constants.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SmsInfo } from '../models/smsInfo.model';
import { RxService } from '../rx.service';



@Component({
  selector: 'app-sms-setup',
  templateUrl: './sms-setup.component.html',
  styleUrls: ['./sms-setup.component.css']
})
export class SmsSetupComponent implements OnInit {

  sms!: SmsInfo;
  session = this.constantService.takeSession();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonApi: CommonApiService,
    private constantService: ConstantsService,
    private rx:RxService
  ) { }

  ngOnInit(): void {
    this.commonApi.getSMSSetup(this.data.countryId).subscribe((data: any) => {
      this.sms = data;
    }, err => {
      console.log(err);
    })
  }

  updateSMSSetup(): any {
    if (this.sms.SMSApi == null || this.sms.SMSApi == '') {
      Swal.fire('Please enter SMS API');
      return false;
    }
    if (this.sms.SMSUserVariableName == null || this.sms.SMSUserVariableName == '') {
      Swal.fire('Please enter username variable');
      return false;
    }
    if (this.sms.SMSUsername == null || this.sms.SMSUsername == '') {
      Swal.fire('Please enter username details');
      return false;
    }
    if (this.sms.SMSPassVariable == null || this.sms.SMSPassVariable == '') {
      Swal.fire('Please enter password variable');
      return false;
    }
    if (this.sms.SMSPassword == null || this.sms.SMSPassword == '') {
      Swal.fire('Please enter password');
      return false;
    }
    if (this.sms.SMSTypeVariable == null || this.sms.SMSTypeVariable == '') {
      Swal.fire('Please enter SMS type variable');
      return false;
    }
    if (this.sms.SMSTypeValue == null || this.sms.SMSTypeValue == '') {
      Swal.fire('Please enter SMS type type');
      return false;
    }
    if (this.sms.SMSSenderVariable == null || this.sms.SMSSenderVariable == '') {
      Swal.fire('Please enter sender variable');
      return false;
    }
    if (this.sms.SMSSenderValue == null || this.sms.SMSSenderValue == '') {
      Swal.fire('Please enter sender ID');
      return false;
    }
    if (this.sms.SMSMobileVariable == null || this.sms.SMSMobileVariable == '') {
      Swal.fire('Please enter mobile number variable');
      return false;
    }
    if (this.sms.SMSTextVariable == null || this.sms.SMSTextVariable == '') {
      Swal.fire('Please enter sms text variable');
      return false;
    }
    if (this.sms.SMSTemplate == null || this.sms.SMSTemplate == '') {
      Swal.fire('Please enter sms text variable');
      return false;
    }
    this.sms.AccountId = this.session.AccountId;
    this.sms.DealerId = this.session.DealerId; 
    this.sms.Country_Id = this.data.CountryId;
    this.commonApi.configureSMSSetup(this.sms).subscribe((data: any) => {
      if (data != null) {
        Swal.fire('success', data, 'success');
        this.rx.sendToggleEvent();
      }

    }, error => {
      console.log(error);
    });
  }

}
