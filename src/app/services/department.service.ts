import { Injectable } from '@angular/core';
import {Departments} from "../models/Departments";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private _isLoaded: boolean = false;

  constructor() { }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  public set isLoaded(value: boolean) {
    this._isLoaded = value;
  }

  public setDepartments(value: Departments[]){
    sessionStorage.setItem('departments', JSON.stringify(value));
    this.isLoaded=true;
  }

  public getDepartments(){
    return JSON.parse(<string>sessionStorage.getItem('departments'))
  }
}
