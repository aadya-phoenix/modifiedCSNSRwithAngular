import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { CommonApiService } from '../services/common-api.service';
import { QuestionArray } from '../../../models/questionArray.model';
import { SurveyForm } from '../../../models/surveyForm.model';
import { SurveyService } from './survey.service';
import { SurveyType } from '../question/models/surveyType.model';
import { Question } from '../models/question.model';
import { QuestionType } from '../models/questionType.model';
import * as _ from 'lodash';
import { QuestionLanguage } from 'src/app/models/questionLanguage.model';
import { Country } from 'src/app/models/country.model';
import { MastersApiService } from 'src/app/services/masters-api.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Language } from 'src/app/models/language.model';
import { SurveyQuestionData } from 'src/app/models/surveyQuestionData.model';
import { Answer } from 'src/app/models/answer.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  public Editor = ClassicEditor;

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;
  searchText:string='';

  session= this.constant.takeSession();
  Role = this.session.RoleName;

  saveSurveyButton:boolean=false;
  updateSurveyButton:boolean=false;

  surveyTypeId:number=0;
  surveyTitle:string='';
  surveyDescription:string='';
  surveyThankyouText:string='';
  surveyThankyouLanguage:string='';

  Id:number=0;
  countryDetails:number=0;
  selectedLanguage:number=0;

  savedFormArray:SurveyForm[]=[];
  questionArray:QuestionArray[]=[];
  surveyTypeObj:SurveyType[]=[];
  questionObj:Question[]=[];
  mainQuestionTypeArray:QuestionType[]=[];
  languageArray!:QuestionLanguage;
  countryObj:Country[]=[];
  languageObj:Language[]=[];
  answers:Answer[]=[];

  constructor(
    private constant:ConstantsService,
    private surveyService:SurveyService,
    private apiService:CommonApiService,
    private masters:MastersApiService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm =false;
    this.languageArray={
      Language_Id : 0 ,
      Language : '' ,
      QuestionOption : '' ,
      IsActive : false ,
    };
    this.questionArray=[{
      QuestionCategory:'',
      IsActive: true,
      Data: [{
        Question: '',
        QuestionType: 0,
        DisplayOrder: 0,
        Weightage:0,
        IsActive: true,
        RadioButtonOptionArray: [],
        SelectOptionArray: [],
        MultiSelectOptionArray: [],
        CheckOptionArray: [],
        QuestionTypeOptions: [],
        LanguageOption:_.cloneDeep(this.languageArray)
      }]
    }];
    
    this.getFormDetails();
  }

  getFormDetails(){
    this.surveyService.getSavedForm(this.session.AccountId, this.session.DealerId).subscribe((data:any)=>{
      this.savedFormArray = data;

      this.apiService.getQuestionType().subscribe((data:any)=>{
          this.mainQuestionTypeArray=data;
          for(let value of this.questionArray){
            for(let item of value.Data){
              item.QuestionTypeOptions = data;
            }
          }
         },error=>{
         console.log(error);
        });
       },error=>{
      console.log(error);
    });

    this.apiService.getSurveyType().subscribe((data:any)=>{
      this.surveyTypeObj = data;
     },error=>{
      console.log(error);
    });
    this.masters.getCountryList().subscribe((data:any)=>{
       this.countryObj = data;
      },error=>{
       console.log(error);
    });
    this.masters.getLanguageList().subscribe((data:any)=>{
     this.languageObj = data;
    },error=>{
      console.log(error);
    });
  }
  createSurvey(){
    this.showSearchGrid = false;
    this.showForm = true;
    this.saveSurveyButton = true;
    this.updateSurveyButton = false;
  }

  populateQuestion(id:number){
    this.surveyService.getQuestionList(id).subscribe((data:any)=>{
      this.questionObj=data;
      for(let value of this.questionArray){
        for(let item of value.Data){
          if(!item.LanguageOption){
          item.QuestionTypeOptions = [];
          }
        }
      }
     },error=>{
      console.log(error);
   });
  }

  deleteCategory(item:QuestionArray){
    item.IsActive = false;
  }

  addCategory(){
    this.questionArray.push({
      QuestionCategory: '',
      IsActive: true,
      Data: [{
          Question: '',
          IsActive: true,
          QuestionType: 0,
          RadioButtonOptionArray: [],
          SelectOptionArray: [],
          MultiSelectOptionArray: [],
          CheckOptionArray: [],
          RangeDetail: {
           Min:0,
           Max:0      
           },
          QuestionTypeOptions: [],
          LanguageOption: {
            Language_Id : 0 ,
            Language : '' ,
            QuestionOption : '' ,
            IsActive : false ,
          }
      }]
    });
   this.populateLanguage(this.countryDetails);
  }

  populateLanguage(id:number){
    for (let obj of this.countryObj){
        if (obj.Country_Id == id) {
            this.selectedLanguage = obj.Language_Id;
        }
    }
    for (let item of this.languageObj) {
        if (item.Language_Id == this.selectedLanguage) {
            this.languageArray = {
                Language_Id: item.Language_Id,
                Language: item.Language,
                QuestionOption: '',
                IsActive: true,
            };
         }
    }
    for (let pt of this.questionArray){
        for (let value of pt.Data) {           
            value.LanguageOption = this.languageArray;
            value.QuestionTypeOptions = [];
        }
    }
  }

  populateAnswers(id:any,pt:SurveyQuestionData){
    if (id) {
    this.apiService.getAnswerList(id).subscribe((data:any)=>{
        this.answers = data;
        pt.QuestionTypeOptions = _.cloneDeep(this.answers)
       },error=>{
        console.log(error);
     });
   }
  }

  addNewQuestion(item:QuestionArray,pt:SurveyQuestionData){
    item.Data.push({
      Question: '',
      IsActive: true,
      QuestionType: 0,
      DisplayOrder: 0,
      Weightage:0,
      RadioButtonOptionArray: [],
      SelectOptionArray: [],
      MultiSelectOptionArray: [],
      CheckOptionArray: [],
      RangeDetail: {Min:0,
        Max:0},
      QuestionTypeOptions: [],
      LanguageOption: {
          IsActive: true,
          Language: pt.LanguageOption!.Language,
          Language_Id: pt.LanguageOption!.Language_Id,
          QuestionOption: ""
      }
   });
  }
  deleteQuestion(item:SurveyQuestionData){
    item.IsActive = false;
  }
  saveForm():any{
    if (!this.surveyTitle) {
      Swal.fire("Error", "Survey Title can not be empty", "error");
      return false;
    }
    else if (!this.surveyDescription) {
      Swal.fire("Error", "Survey Description can not be empty", "error");
      return false;
    }
    else if (!this.surveyTypeId) {
      Swal.fire("Error", "Survey Type can not be empty", "error");
      return false;
    }
    else if (!this.countryDetails) {
      Swal.fire("Error", "Survey Country can not be empty", "error");
      return false;
    }
    else if (!this.surveyThankyouText) {
      Swal.fire("Error", "Survey Thank you message can not be empty", "error");
       return false;
    }
    else if (!this.surveyThankyouLanguage && this.surveyTypeId == 2) {
      Swal.fire("Error", "Survey Thank you for " + this.questionArray[0].Data[0].LanguageOption?.Language + " languange can not be empty", "error");
      return false;
    }
    var TotalW = 0;
     for (var i = 0; i < this.questionArray.length; i++) {
      for (var j = 0; j < this.questionArray[i].Data.length; j++) {
          if (i == 0 && j == 0) {
          }
          else if (this.questionArray[i].Data[j].QuestionType == 6) {
          }
          else {
            //  TotalW += this.questionArray[i]?.Data[j]?.Weightage;
          }
      }
     }

    if (TotalW > 100){
      Swal.fire("Error", "Survey Weightage cannot be more then 100%", "error");
      return false;
    }

   const Obj:SurveyForm = {
      SurveyTitle: this.surveyTitle,
      SurveyDescription: this.surveyDescription,
      SurveyType_Id: this.surveyTypeId,
      QuestionArray: this.questionArray,
      Account_Id: this.session.AccountId,
      DealerId: this.session.DealerId,
      User_Id: this.session.User_Id,
      Country_Id: this.countryDetails,
      Language_Id: this.selectedLanguage,
      SurveyThankyouLanguage: this.surveyThankyouLanguage,
      SurveyThankyouText: this.surveyThankyouText
   };
   this.surveyService.saveForm(Obj).subscribe((data:any)=>{
      Swal.fire('Success', 'Survey form Saved successfully', 'success');
      this.init();
     },error=>{
      console.log(error);
    });
  }
  editTransaction(id:any,pt:any){
    this.surveyService.getFormDetail(id).subscribe((data:any)=>{
      this.questionArray = data.QuestionArray;
      this.surveyTitle = pt.SurveyTitle;
      this.surveyDescription = data.SurveyDescription;
      this.surveyTypeId = data.SurveyType_Id;
      this.countryDetails = data.Country_Id;
      this.selectedLanguage = data.Language_Id;
      this.surveyThankyouLanguage = data.SurveyThankyouLanguage;
      this.surveyThankyouText = data.SurveyThankyouText;
      this.Id = id;
      },error=>{
     console.log(error);
     });
    this.showSearchGrid = false;
    this.showForm = true;
    this.saveSurveyButton = false;
    this.updateSurveyButton = true;
    this.populateQuestion(this.surveyTypeId);
    this.populateLanguage(this.countryDetails);
   
  }
  editForm(){
    const obj:SurveyForm = {
      Id: this.Id,
      SurveyTitle: this.surveyTitle,
      SurveyDescription: this.surveyDescription,
      SurveyType_Id: this.surveyTypeId,
      QuestionArray: this.questionArray,
      Account_Id: this.session.AccountId,
      DealerId: this.session.DealerId,
      User_Id: this.session.User_Id,
      Country_Id: this.countryDetails,
      Language_Id: this.selectedLanguage,
      SurveyThankyouLanguage: this.surveyThankyouLanguage,
      SurveyThankyouText: this.surveyThankyouText
  }
    this.surveyService.editSurveyForm(obj).subscribe((data:any)=>{
      Swal.fire('Success', 'Survey form Saved successfully', 'success');
      this.init();
     },error=>{
      console.log(error);
    });
  }
  deleteTransaction(id:any){
    this.surveyService.deleteForm(id).subscribe((data:any)=>{
      this.init();
      Swal.fire("success", "Survey deleted succesfully!", "success");
     },error=>{
      console.log(error);
    });
  }

  init(){
    this.showSearchGrid = true;
    this.showForm =false;
    this.languageArray={
      Language_Id : 0 ,
      Language : '' ,
      QuestionOption : '' ,
      IsActive : false ,
    };
    this.questionArray=[{
      QuestionCategory:'',
      IsActive: true,
      Data: [{
        Question: '',
        QuestionType: 0,
        DisplayOrder: 0,
        Weightage:0,
        IsActive: true,
        RadioButtonOptionArray: [],
        SelectOptionArray: [],
        MultiSelectOptionArray: [],
        CheckOptionArray: [],
        QuestionTypeOptions: [],
        LanguageOption:_.cloneDeep(this.languageArray)
      }]
    }];
    
    this.getFormDetails();
  }

}
