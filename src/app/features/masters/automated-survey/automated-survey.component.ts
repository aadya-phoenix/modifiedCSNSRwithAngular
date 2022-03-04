import { Component, OnInit } from '@angular/core';
import { AutomatedSurveyService } from './automated-survey.service';
import { AutomatedSurveyInfo } from './automatedSurveyInfo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-automated-survey',
  templateUrl: './automated-survey.component.html',
  styleUrls: ['./automated-survey.component.css']
})
export class AutomatedSurveyComponent implements OnInit {

  tasksObj:AutomatedSurveyInfo[]=[];

  constructor(
    private automatedSurveyService:AutomatedSurveyService
  ) { }

  ngOnInit(): void {
    this.getFormDetails();
  }

  getFormDetails(){
    this.automatedSurveyService.getTaskInfo().subscribe((data:any)=>{
        this.tasksObj = data;
      },error=>{
        console.log(error);
    });
  }

  startService(pt:AutomatedSurveyInfo){
    pt.Status = 1;
    this.automatedSurveyService.triggerSurvey(pt.FirstTriggerFrequency, pt.SubsequentTriggerFrequency, 
      pt.SurveyCount, pt.Status, pt.Survey_Id).subscribe((data:any)=>{
            Swal.fire('Success', data, 'success');
          },error=>{
            console.log(error);
        });
  }

  stopService(pt:AutomatedSurveyInfo){
    pt.Status = 0;
  }
}
