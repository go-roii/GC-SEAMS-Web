import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}
  public baseURL = "http://https://seams-backend.herokuapp.com/api/v1/"

  httprequest(endpoint: string, data: any, sw: number){
    let result: any
    switch(sw){
      case 1:
        result = this.http.get(this.baseURL+endpoint);
      break;
      case 2:
        result = this.http.post(this.baseURL+endpoint, JSON.stringify(data));
      break;
      default:
      break;
    }
    return result
  }
}
