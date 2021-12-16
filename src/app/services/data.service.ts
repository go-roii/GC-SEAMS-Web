import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'
import { RequestParams } from '../models/RequestParams';
import { Courses } from '../models/Courses';
import {Observable, throwError} from 'rxjs';
import {RefreshTokens} from "../models/RefreshTokens";
import {UserService} from "./user.service";
import {retry} from "rxjs/operators";

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class DataService {

swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      popup: 'gs-dialog',
      confirmButton: 'btn btn-primary rounded-pill',
      cancelButton: 'btn btn-danger rounded-pill'
    },
    buttonsStyling: false
  })

  constructor(private http: HttpClient) {}
  public baseURL = "https://seams-backend.herokuapp.com/api/v1/"

  getConfigResponse(endpoint: string, body: Credential): Observable<HttpResponse<RefreshTokens>> {

    return this.http.post<RefreshTokens>(
      this.baseURL+"/"+endpoint, body, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );

  }

  getNewAccessToken(endpoint: string, body: RefreshTokens): Observable<HttpResponse<RefreshTokens>> {
    return this.http.post<RefreshTokens>(this.baseURL+"/"+endpoint, body, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );

  }

  httprequest(requestParams: RequestParams){

    let result: any
    switch(requestParams.RequestType){

      //get data without authentication header
      case 1:
        result = this.http.get(this.baseURL+requestParams.EndPoint);
        break

      //post data without authentication header;
      case 2:
        result = this.http.post(this.baseURL+requestParams.EndPoint, requestParams.Body)
        break;

      //post data and get the access token from the header and the refresh token from the body.
      case 3:
        result=this.getConfigResponse(requestParams.endPoint, requestParams.body);
        break;

      //post data with authentication header
      case 4:
        result = this.http.post(this.baseURL+requestParams.EndPoint, requestParams.Body, requestParams.AuthToken)
        break;

      //get data with authentication header
      case 5:
        result = this.http.get(this.baseURL+requestParams.EndPoint, requestParams.AuthToken)
        break

      //put data with authentication header
      case 6:
        result = this.http.put(this.baseURL+requestParams.EndPoint, requestParams.Body, requestParams.AuthToken)
        break;
      default:
      break;
    }

    return result;
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // A client-side or network error occurred. Handle it accordingly.
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Error',
        text: 'User not found.',
        confirmButtonText: 'Try again'
      })
    }else if(error.status === 401){
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Error',
        text: 'Password is incorrect.',
        confirmButtonText: 'Try again'
      })
    }else if(error.status === 400){
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong with the server.',
        confirmButtonText: 'Try again'
      })
    }else if(error.status === 503){
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong with the server.',
        confirmButtonText: 'Try again'
      })
    }
    else {
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



