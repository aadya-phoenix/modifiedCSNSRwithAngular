import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-report',
  templateUrl: './country-report.component.html',
  styleUrls: ['./country-report.component.css']
})
export class CountryReportComponent implements OnInit {

  errorButtonVisible:boolean = false;
  reportDetails:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
