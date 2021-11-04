import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { RequestParams } from '../models/RequestParams';
import { Courses } from '../models/Courses';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}
  public baseURL = "https://seams-backend.herokuapp.com/api/v1/"



  httprequest(requestParams: RequestParams){
    let result: any
    switch(requestParams.RequestType){
      case 1:
        result = this.http.get<Courses>(this.baseURL+requestParams.EndPoint).pipe();
      break;
      case 2:
        result = this.http.post(this.baseURL+requestParams.EndPoint, JSON.stringify(requestParams.Body));
      break;
      default:
      break;
    }
    return result;
  }
}
