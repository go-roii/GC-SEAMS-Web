import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http'
import { RequestParams } from '../models/RequestParams';
import { Courses } from '../models/Courses';
import { throwError } from 'rxjs';
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
        result = this.http.get(this.baseURL+requestParams.EndPoint);
      break;
      case 2:
        result = this.http.post(this.baseURL+requestParams.EndPoint, requestParams.Body);
      break;
      default:
      break;
    }
    return result;
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

function catchError(handleError: any): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}



