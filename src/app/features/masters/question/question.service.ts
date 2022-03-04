import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionAnswerInfo } from './models/questionAnswerInfo.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  AppUrl ="https://demo2.suzuki-feedback.com";
  constructor(
    private http: HttpClient
  ) { }

  getQuestionList(){
    return this.http.get(this.AppUrl +'/api/Quetsion/GetQuestionList');
  }
  addQuestion(data:QuestionAnswerInfo){
    return this.http.post(this.AppUrl +'/api/Quetsion/AddQuestion/', data, {});
  }
  deleteQuestion(data:Question){
    return this.http.post(this.AppUrl +'/api/Quetsion/DeleteQuestion/', data, {});
  }
}
