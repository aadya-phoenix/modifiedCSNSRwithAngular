import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommonApiService } from '../../services/common-api.service';

import { Email } from '../../models/email.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { RxService } from '../rx.service';


@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {

  email!: Email;
  public Editor = ClassicEditor;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonApi: CommonApiService,
    private rx:RxService
  ) { } 
  

  ngOnInit(): void {
    this.commonApi.getEmailTemplate(this.data.countryId).subscribe((data:any) => {
      this.email = data;
    }, error => {
      console.log(error);
    });
  }

  updateEmailTemplate(): any {
    if (this.email.EmailSubject == null || this.email.EmailSubject == '') {
      Swal.fire('Please enter Email Body');
      return false;
    }
    if (this.email.EmailTemplate == null || this.email.EmailTemplate == '') {
      Swal.fire('Please enter Email Body');
      return false;
    }

    this.commonApi.updateEmailTemplate(this.email).subscribe((data: any) => {
      if (data != null) {
        Swal.fire('success', data, 'success');
        this.rx.sendToggleEvent();
      }
    }, (error) => {
      console.log(error);
    });
  }

}
