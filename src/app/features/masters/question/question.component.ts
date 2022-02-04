import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { CommonApiService } from '../services/common-api.service';
import { Question } from './models/question.model';
import { QuestionType } from './models/questionType.model';
import { SurveyType } from './models/surveyType.model';
import { QuestionService } from './question.service';
import * as cloneDeep from 'lodash';
import Swal from 'sweetalert2';
import { QuestionAnswerInfo } from './models/questionAnswerInfo.model';
import { Answer } from './models/answer.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  
  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;

  session = this.constant.takeSession();
  Role = this.session.RoleName;
  searchText:string='';

  questionObj:Question[] = [];
  questionTypeObj:QuestionType[]=[];
  surveyTypeObj:SurveyType[]=[];
  question!:Question;

  answers:Answer[]=[];
  savedAnswer:Answer[]=[];
  optionsRequired:boolean=false;
  savedTypeId:number = 0;

  p: any;
  
  constructor(
    private apiService:CommonApiService,
    private constant:ConstantsService,
    private queService:QuestionService,
    private masterService:MastersApiService,
    public dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }

  getFormDetails(){
   this.queService.getQuestionList().subscribe((data:any)=>{
         this.questionObj = data;
        },error=>{
          console.log(error);
      });
     this.queService.getQuestionType().subscribe((data:any)=>{
         this.questionTypeObj = data;
        },error=>{
          console.log(error);
      });
     this.queService.getSurveyType().subscribe((data:any)=>{
         this.surveyTypeObj = data;
        },error=>{
          console.log(error);
      });
  }
 
  addQuestion(){
    this.question = {
      Question_Id: 0,
      Question: '',
      QuestionType: 0,
      Mode:0,
      TypeName:'',
      IsActive: true,
      CreatedBy: this.session.User_Id,
      ModifiedBy: 0,  
   };
  this.showSearchGrid = false;
  this.showForm = true;
  this.showEditForm = false;
  this.answers = [];
  }

  getAnswers(id:any){
    if(id==1)
    {
        if (this.savedTypeId == 1) {
            this.answers = [...this.savedAnswer]; 
        }
        else {
            this.answers.push({
                Answer_Id: 0,
                Answer: 'Yes',
                IsActive: true,
                DisplayOrder: 1
            });
            this.answers.push({
                Answer_Id: 0,
                Answer: 'No',
                IsActive: true,
                DisplayOrder: 1
            });
            this.answers.push({
                Answer_Id: 0,
                Answer: 'NA',
                IsActive: true,
                DisplayOrder: 1
            });
        }
        this.optionsRequired = false;
    }
    if (id == 2) {
      if (this.savedTypeId == 2) {
          this.answers = [...this.savedAnswer];
      }
      else {
          this.answers.push({
              Answer_Id: 0,
              Answer: '',
              IsActive: true,
              DisplayOrder: 1
          });
      }
      this.optionsRequired = true;
    }
    if (id == 3) {
      if (this.savedTypeId == 3) {
          this.answers = [...this.savedAnswer];      
      }
      else {
          this.answers.push({
              Answer_Id: 0,
              Answer: '',
              IsActive: true,
              DisplayOrder: 1
          });
      }
      this.optionsRequired = true;
    }
    if (id == 9) {
      if (this.savedTypeId == 9) {
          this.answers = [...this.savedAnswer];      
      }
      else {
          this.answers.push({
              Answer_Id: 0,
              Answer: 'Highly Satisfied',
              IsActive: true,
              DisplayOrder: 1
          });
          this.answers.push({
              Answer_Id: 0,
              Answer: 'Satisfied',
              IsActive: true,
              DisplayOrder: 2
          });
          this.answers.push({
              Answer_Id: 0,
              Answer: 'Unsatisfied',
              IsActive: true,
              DisplayOrder: 3
          });
          this.answers.push({
              Answer_Id: 0,
              Answer: 'Highly Unsatisfied',
              IsActive: true,
              DisplayOrder: 4
          });
      }
      this.optionsRequired = false;
    }
  }

  addRow(){
    this.answers.push({
      Answer_Id: 0,
      Answer: '',
      IsActive: true,
      DisplayOrder: 1

  });
  }
  removeRow(pt:Answer){
    pt.IsActive = false;
  }
 
  editTransaction(pt:Question){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm =  true;

     this.question = pt;
     this.savedTypeId = pt.QuestionType;
      this.queService.getAnswerList(pt.Question_Id).subscribe((data:any)=>{
            this.answers = data;
            this.savedAnswer = [...this.answers];
        },error=>{
          console.log(error);
      });
  }
  deleteTransaction(pt:Question){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false 
     }).then((result):any=>{
       if(result.isConfirmed){
        pt.ModifiedBy = this.session.User_Id;

        this.queService.deleteQuestion(pt).subscribe((data:any)=>{
          Swal.fire('Success', 'Survey form Saved successfully', 'success');
          this.init();
          },error=>{
           console.log(error);
         });
       }
      });
  }

  saveForm(){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false 
     }).then((result):any=>{
       if(result.isConfirmed){
       if (this.question.Question == null || this.question.Question == '') {
         Swal.fire('error', 'Please enter question ', 'error');
         return false;
     }
     if (this.question.QuestionType == null || this.question.QuestionType == 0) {
         Swal.fire('error', 'Please select question type', 'error');
         return false;
     }
     if (this.question.Mode == null || this.question.Mode == 0) {
         Swal.fire('error', 'Please select survey type', 'error');
         return false;
     }
     const obj:QuestionAnswerInfo = {
      Question:this.question,
      Answer:this.answers
      };

     this.queService.addQuestion(obj).subscribe((data:any)=>{
      Swal.fire('Success', 'Survey form Saved successfully', 'success');
      this.init();
      },error=>{
       console.log(error);
     });
    }
   });
  }
 editSaveTransaction(){

 }

  init(){
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }
}
