import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  errorButtonVisible:boolean=false;
  reportDetails:any;

  constructor() { }

  ngOnInit(): void {
    
  }
  exportErrorReport(){}

  cancelReport(){}

}
