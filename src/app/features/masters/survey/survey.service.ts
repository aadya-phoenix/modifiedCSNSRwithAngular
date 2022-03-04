import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SurveyForm } from 'src/app/models/surveyForm.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http:HttpClient
  ) { }

  getSavedForm(accountId:number, dealerId:number){
    return this.http.get(this.AppUrl +'/api/Form/GetSavedForm?AccountId=' + accountId + '&DealerId=' + dealerId);
  }
  getQuestionList(id:number) {
    return this.http.get(this.AppUrl + '/api/Quetsion/GetQuestionList?Mode=' + id);
  }
  saveForm(data:SurveyForm){
    return this.http.post(this.AppUrl + '/api/Form/SaveForm/', data, {});
  }
  editSurveyForm(data:SurveyForm){
    return this.http.post(this.AppUrl + '/api/Form/EditSurveyForm/', data, {});
  }
  getFormDetail(id:number){
    return this.http.get(this.AppUrl + '/api/Form/GetFormDetail?Id=' + id);
  }
  deleteForm(id:number){
    return this.http.get(this.AppUrl + '/api/Form/DeleteForm?Id=' + id);
  }
}
