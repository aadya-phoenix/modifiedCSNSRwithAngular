import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './models/question.model';
import { QuestionAnswerInfo } from './models/questionAnswerInfo.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  //appUrl = this.constant.AppUrl;

  constructor(
    private http: HttpClient
  ) { }

  getQuestionList(){
    return this.http.get('/api/Quetsion/GetQuestionList');
  }
  getQuestionType(){
    return this.http.get('/api/QuestionType/GetQuestionType/');
  }

  getSurveyType(){
    return this.http.get('/api/Form/GetSurveyType');
  }
  addQuestion(data:QuestionAnswerInfo){
    return this.http.post('/api/Quetsion/AddQuestion/', data, {});
  }
  getAnswerList(id:number) {
    return this.http.get('/api/Quetsion/GetAnswerList?QuestionId=' + id);
  }
  deleteQuestion(data:Question){
    return this.http.post('/api/Quetsion/DeleteQuestion/', data, {});
  }
}
